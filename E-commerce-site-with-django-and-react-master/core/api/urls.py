from django.urls import path
from .views import (
    ItemListView,
    ItemDetailView,
    AddToCartView,
    OrderDetailView,
    PaymentView,
    AddCouponView,


)

from core.api import views

urlpatterns = [

    path('products/', ItemListView.as_view(), name='product-list'),
    path('products/<pk>/', ItemDetailView.as_view(), name='product-detail'),
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('order-summary/', OrderDetailView.as_view(), name='order-summary'),
    path('checkout/', PaymentView.as_view(), name='checkout'),
    path('add-coupon/', AddCouponView.as_view(), name='add-coupon'),
    path('address/', views.AddressListView.as_view(), name='address'),
    path('createaddress/',
         views.CreateAddressListView.as_view(), name='createaddress'),
    path('country', views.CountryListView.as_view(), name='country'),
    path('userid', views.UserIdView.as_view(), name='userid'),
    path('updateaddress/<pk>/',
         views.UpdateAddressListView.as_view(), name='updateaddress'),
    path('deleteaddress/<pk>/',
         views.DeleteAdress.as_view(), name='deleteaddress'),

    path('deleteitem/<pk>/', views.deleteItem.as_view(), name='deleteitem'),
    path('removeitem/', views.removefromcart.as_view(), name='deleteitem'),

    path('paymenthistory/', views.PaymentListView.as_view(), name="paymenthistory")


















]
