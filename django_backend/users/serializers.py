from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode as uid_decoder
# from django.utils.translation import ugettext_lazy as _

from users.models import Profile

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'first_name', 'last_name', 'email', 'password', 'user_type')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print(validated_data)  # print validated data
        password = validated_data.pop('password')
        user = get_user_model().objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

class PasswordResetConfirmSerializer(serializers.Serializer):
    uidb64 = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        try:
            uid = uid_decoder(attrs['uidb64'])
            self.user = get_user_model().objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):
            raise serializers.ValidationError({'uidb64': _('Invalid value')})

        if not default_token_generator.check_token(self.user, attrs['token']):
            raise serializers.ValidationError({'token': _('Invalid value')})

        return attrs

    def save(self):
        password = self.validated_data.get('new_password')
        self.user.set_password(password)
        self.user.save()
        return self.user
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('user', 'picture', 'bio')

    def to_representation(self, instance):
        self.fields['user'] = UserCreateSerializer(read_only=True)
        return super(ProfileSerializer, self).to_representation(instance)
