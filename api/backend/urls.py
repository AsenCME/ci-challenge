from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from api import views
from api.director.view import DirectorViewSet
from api.movie.view import MovieViewSet

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'directors', DirectorViewSet)
router.register(r'movies', MovieViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
]
