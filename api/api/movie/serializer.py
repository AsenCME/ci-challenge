from rest_framework import serializers
from api.movie.model import Movie


class MovieSerializer(serializers.HyperlinkedModelSerializer):
    director = serializers.StringRelatedField(many=False)

    class Meta:
        model = Movie
        fields = ['id', 'name', 'release_year', 'director']
