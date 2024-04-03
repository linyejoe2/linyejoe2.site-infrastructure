provider "aws" {
  region = "ap-northeast-2"
}

resource "aws_apigatewayv2_api" "api" {
  name          = "api"
  protocol_type = "HTTP"
}
