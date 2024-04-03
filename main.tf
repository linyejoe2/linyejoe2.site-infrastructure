provider "aws" {
  region = "ap-northeast-2"
}

# domain setting
resource "aws_apigatewayv2_domain_name" "main-domain" {
  domain_name = "api.linyejoe2.site"
  domain_name_configuration {
    certificate_arn = aws_acm_certificate.main-domain-cert.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_acm_certificate" "main-domain-cert" {
  domain_name       = "*.linyejoe2.site"
  validation_method = "DNS"

  lifecycle {
    prevent_destroy = true
  }
}

# main api setting
resource "aws_apigatewayv2_api" "main-api" {
  name          = "main-api"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = [
      "https://linyejoe2.site"
    ]
    allow_headers = [
      "Content-Type",
      "Authorization",
      "X-Amz-Date",
      "X-Amz-Security-Token",
      "X-Api-Key",
    "Notion-Version"]
    allow_methods = [
      "GET",
      "POST"
    ]
    allow_credentials = true
    max_age           = 6000
  }
}

resource "aws_apigatewayv2_stage" "main-api-stage" {
  api_id = aws_apigatewayv2_api.main-api.id
  name   = "$default"
}

resource "aws_apigatewayv2_api_mapping" "main-api-mapping" {
  api_id      = aws_apigatewayv2_api.main-api.id
  stage       = aws_apigatewayv2_stage.main-api-stage.id
  domain_name = aws_apigatewayv2_domain_name.main-domain.id
}