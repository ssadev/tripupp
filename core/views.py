from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
import json
from django.core.files.storage import FileSystemStorage
from rest_framework.generics import (ListAPIView)
from django.core import serializers
# from .form import MatchImageSearchForm
from .serializers import (SolutionsSerializer)
from .models import Solutions


def index(request):
    return render(request, 'index.html', {})


def search(request):
    queryset = {}
    if request.method == 'GET' and request.GET['q']:
        q = request.GET['q']
        queryset = Solutions.objects.filter(context__icontains=q)
        serialized_queryset = serializers.serialize('json', queryset)
    # return JsonResponse(serialized_queryset, safe=False)
    return render(request, 'search_result.html', {'data': queryset, 'q': q})


def solution(request, sol_id):
    data = {}
    data = Solutions.objects.all().filter(id=sol_id)
    print(data)
    return render(request, 'solution.html', {"data": data})


# class SerachResultView(ListAPIView):
#     serializer_class = SolutionsSerializer

#     def get_queryset(self):
#         question = self.request.query_params.get('q', None)
#         print(question)
#         queryset = Solutions.objects.filter(context=question)
