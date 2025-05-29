FROM php:8.2-apache

RUN docker-php-ext-install mysqli pdo_mysql
# RUN apt update
# RUN apt -y install php libapache2-mod-php
# RUN a2enmod php8.2

# COPY ./php.ini /etc/php/8.2/apache2/php.ini

#COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf