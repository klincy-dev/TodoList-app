from django.urls import path
from . import views

urlpatterns = [
    path('todos/', views.get_todos),
    path('todos/add/', views.add_todo),
    path('todos/update/<int:pk>/', views.update_todo),
    path('todos/delete/<int:pk>/', views.delete_todo),
]
