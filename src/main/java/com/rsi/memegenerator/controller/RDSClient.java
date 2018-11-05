package com.rsi.memegenerator.controller;

import org.springframework.beans.factory.annotation.Value;

public class RDSClient {
    @Value("${amazonRdsProperties.endpointUrl}")
    private String endpointUrl;
    @Value("${amazonRdsProperties.region}")
    private String region;
    @Value("${amazonRdsProperties.port}")
    private String port;
    @Value("${amazonRdsProperties.username}")
    private String username;
    @Value("${amazonProperties.accessKey}")
    private String accessKey;
    @Value("${amazonProperties.secretKey}")
    private String secretKey;
}
