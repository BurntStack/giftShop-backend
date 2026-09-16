from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_control
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Product, Wishlist, WishlistItem
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    WishlistItemSerializer,
    WishlistSerializer,
)


@method_decorator(cache_control(public=True, max_age=300, s_maxage=600), name='dispatch')
class ProductListView(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = Product.objects.filter(is_active=True).select_related('category').prefetch_related('images')

        search = self.request.query_params.get('search', '').strip()
        if search:
            qs = qs.filter(Q(name__icontains=search) | Q(description__icontains=search))

        category_slug = self.request.query_params.get('category', '').strip()
        if category_slug:
            qs = qs.filter(category__slug=category_slug)

        min_price = self.request.query_params.get('min_price', '').strip()
        if min_price:
            try:
                qs = qs.filter(price__gte=float(min_price))
            except ValueError:
                pass

        max_price = self.request.query_params.get('max_price', '').strip()
        if max_price:
            try:
                qs = qs.filter(price__lte=float(max_price))
            except ValueError:
                pass

        ordering = self.request.query_params.get('ordering', '').strip()
        ordering_map = {
            'price_asc': 'price',
            'price_desc': '-price',
            'name_asc': 'name',
        }
        if ordering in ordering_map:
            qs = qs.order_by(ordering_map[ordering])

        return qs


@method_decorator(cache_control(public=True, max_age=300, s_maxage=600), name='dispatch')
class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True).select_related('category').prefetch_related('images')
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


@method_decorator(cache_control(public=True, max_age=600, s_maxage=1800), name='dispatch')
class CategoryListView(ListAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class WishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wishlist, _ = Wishlist.objects.get_or_create(user=request.user)
        return Response(WishlistSerializer(wishlist).data)

    def post(self, request):
        product_id = request.data.get('product_id')
        if not product_id:
            return Response({'detail': 'product_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        product = get_object_or_404(Product, id=product_id, is_active=True)
        wishlist, _ = Wishlist.objects.get_or_create(user=request.user)

        item, created = WishlistItem.objects.get_or_create(wishlist=wishlist, product=product)
        if not created:
            return Response(
                {'detail': 'Product already in wishlist.'},
                status=status.HTTP_200_OK,
            )

        return Response(WishlistSerializer(wishlist).data, status=status.HTTP_201_CREATED)


class WishlistItemView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, item_id):
        item = get_object_or_404(WishlistItem, id=item_id, wishlist__user=request.user)
        wishlist = item.wishlist
        item.delete()
        return Response(WishlistSerializer(wishlist).data)
