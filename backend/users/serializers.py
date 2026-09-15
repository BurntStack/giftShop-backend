from rest_framework import serializers

from .models import Address


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            'id', 'full_name', 'phone_number', 'line1', 'line2',
            'city', 'state', 'postal_code', 'country', 'is_default',
        ]
