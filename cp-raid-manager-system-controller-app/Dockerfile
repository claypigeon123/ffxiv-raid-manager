FROM openjdk:11-slim as base

RUN mkdir -p /opt/microservice

# Set the working directory to microsevice directory
WORKDIR /opt/microservice

EXPOSE 9000

# Set the default command to run on boot
ENTRYPOINT exec java -jar /opt/microservice/${MICROSERVICE_NAME}.jar

FROM base AS java-microservice

# Set of required build time args
ARG MICROSERVICE_NAME
ARG MICROSERVICE_VERSION

# Set the env variables
ENV MICROSERVICE_NAME ${MICROSERVICE_NAME}
ENV MICROSERVICE_VERSION ${MICROSERVICE_VERSION}

# Copy application and all customized files for docker version
COPY target/${MICROSERVICE_NAME}-${MICROSERVICE_VERSION}.jar /opt/microservice/${MICROSERVICE_NAME}.jar