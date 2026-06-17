#!/bin/bash

# Test Node.js API endpoints

API_BASE_URL="http://localhost:8000"

echo "Testing API Endpoints"
echo "===================="
echo ""

# Test /api/health endpoint
echo "Testing /api/health endpoint:"
curl -s "${API_BASE_URL}/api/health" | jq . || echo "Error: Could not connect to health endpoint"
echo ""

# Test /api/users endpoint
echo "Testing /api/users endpoint:"
curl -s "${API_BASE_URL}/api/users" | jq . || echo "Error: Could not connect to users endpoint"
echo ""

# Test /api/activities endpoint
echo "Testing /api/activities endpoint:"
curl -s "${API_BASE_URL}/api/activities" | jq . || echo "Error: Could not connect to activities endpoint"
echo ""

echo "API Tests Complete"