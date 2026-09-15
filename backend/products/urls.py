from django.urls import path

from .views import CategoryListView, ProductDetailView, ProductListView, WishlistItemView, WishlistView

urlpatterns = [
    path('', ProductListView.as_view(), name='product-list'),
    path('<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
]

wishlist_urlpatterns = [
    path('', WishlistView.as_view(), name='wishlist'),
    path('<int:item_id>/', WishlistItemView.as_view(), name='wishlist-item'),
]
