from rest_framework import viewsets
from rest_framework import permissions

from api.director.serializer import DirectorSerializer
from api.director.model import Director


class DirectorViewSet(viewsets.ModelViewSet):
    queryset = Director.objects.all()
    serializer_class = DirectorSerializer
    action_permissions = {
        permissions.IsAuthenticated: ["destroy"],
        permissions.AllowAny: ["list", "retrieve",
                               "update", "partial_update", "create"]
    }
