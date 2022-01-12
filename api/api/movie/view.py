import json
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from api.movie.serializer import MovieSerializer
from api.director.model import Director
from api.movie.model import Movie


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all().order_by("release_year")
    serializer_class = MovieSerializer
    action_permissions = {
        permissions.IsAuthenticated: ["destroy"],
        permissions.AllowAny: ["list", "retrieve",
                               "update", "partial_update", "create"]
    }

    def create(self, request):
        data = json.loads(request.body)
        print(data)
        m = Movie(name=data['name'], release_year=data['release_year'])
        m.director = Director.objects.get(pk=data['director'])
        m.save()
        serializer = MovieSerializer(m)
        return Response(serializer.data)
