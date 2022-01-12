from rest_framework import serializers
from api.director.model import Director
from api.movie.model import Movie
from api.movie.serializer import MovieSerializer


class DirectorSerializer(serializers.HyperlinkedModelSerializer):
    movies = MovieSerializer(many=True, read_only=True)

    class Meta:
        model = Director
        fields = ['id', 'first_name', 'last_name', 'movies']
