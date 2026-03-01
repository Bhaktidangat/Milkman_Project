from django.contrib import admin
from .models import Subscription

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'product', 'frequency', 'start_date', 'end_date', 'is_active')
    list_filter = ('frequency', 'is_active', 'start_date')
    search_fields = ('user__username', 'product__name')
