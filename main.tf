terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

region {
    default     = "us-east-2"
    description = "AWS region"
}

provider "aws" {
  region  = "us-east-2"
}

resource "aws_instance" "gpt_build" {
    instance_type       = "t2.micro"
    ami                 = "ami-053b0d53c279acc90"
    security_groups     = ["aws_security_groups.flask_web_server_sec_group.name"]

    tags = {
      name              = "gpt_build"
    }
    //key_name = "vs-flask-1"
    
    # root disk
    root_block_device {
      volume_size       = "8"
      volume_type       = "gp2"
      encrypted         = true
    }
}

# Key pair config
resource "aws_key_pair" "tf_key" {
  key_name      = "tf_key"
  public_key    = tls_private_key.RSA_key.public_key_openssh
}

resource "tls_private_key" "RSA_key" {
  algorithm     = "RSA"
  rsa_bits      = 4096
}

# Store Private Key Locally
resource "local_file" "RSA_key" {
  content = tls_private_key.RSA_key.private_key_pem
  filename = "tfkey"
}

# Security group config
resource "aws_security_group" "flask_web_server_sec_group" {
    name                = "flask_web_server_sec_group"
    description         = "Security group for Terraform build"
    vpc_id              = aws_vpc.gpt_build

    ingress {
      description     = "SSH"
      from_port       = 22
      to_port         = 22
      protocol        = "tcp"
      cidr_blocks     = ["0.0.0.0/0"]
    }

    ingress {
      description     = "HTTP"
      from_port       = 80
      to_port         = 80
      protocol        = "tcp"
      cidr_blocks     = ["0.0.0.0/0"]
    }

    ingress {
      description     = "HTTPS"
      from_port       = 443
      to_port         = 443
      protocol        = "tcp"
      cidr_blocks     = ["0.0.0.0/0"]
    }

    ingress {
      description     = "Custom TCP"
      from_port       = 5000
      to_port         = 5000
      protocol        = "tcp"
      cidr_blocks     = ["0.0.0.0/0"]
    }

    egress {
      from_port       = 0
      to_port         = 0  
      protocol        = "-1"
      cidr_blocks     = ["0.0.0.0/0"]
    }

    tags {
      Name = "flask_web_server_sec_group"
    }

}

# AWS VPC Config
resource "aws_vpc" "gpt_build_vpc" {
  name = "gpt_build-vpc"
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "TerraformVPC"
  }
}

# Public Subnet Config
resource "aws_subnet" "PublicSubnet" {
  vpc_id = aws_vpc.gpt_build_vpc.id
  cidr_block = "10.0.1.0/24"
}

# Private Subnet Config
resource "aws_subnet" "PrivateSubnet" {
  vpc_id = aws_vpc.gpt_build_vpc.id
  cidr_block = "10.0.2.0/24"
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.gpt_build_vpc.id
}

# Route table for Public Subnet
resource "aws_route_table" "PublicRT" {
  vpc_id = aws_vpc.gpt_build_vpc.id
  route = {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

# Route table association public subnet
resource "aws_route_table_associate" "PublicRTAssociation" {
  subnet_id = aws_subnet.PublicSubnet.id
  route_table_id = aws_route_table.PublicRT.id
}