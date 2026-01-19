#!/bin/bash

BASE_URL="http://localhost:3000"

echo "1. Creating a new setting..."
CREATE_RES=$(curl -s -X POST -H "Content-Type: application/json" -d '{"theme":"dark","notifications":true}' "$BASE_URL/settings")
echo "Response: $CREATE_RES"
SETTING_ID=$(echo $CREATE_RES | awk -F'"uid":"' '{print $2}' | awk -F'"' '{print $1}')

if [ -z "$SETTING_ID" ]; then
  echo "Failed to create setting or extract SETTING_ID."
  exit 1
fi
echo "Created SETTING_ID: $SETTING_ID"
echo ""

echo "2. Reading All Settings..."
curl -s "$BASE_URL/settings?page=1&limit=5" | head -c 200
echo "..."
echo ""

echo "3. Reading One Setting ($SETTING_ID)..."
curl -s "$BASE_URL/settings/$SETTING_ID"
echo ""

echo "4. Updating Setting ($SETTING_ID)..."
curl -s -X PUT -H "Content-Type: application/json" -d '{"theme":"light","notifications":true}' "$BASE_URL/settings/$SETTING_ID"
echo ""

echo "5. Verifying Update..."
curl -s "$BASE_URL/settings/$SETTING_ID"
echo ""

echo "6. Deleting Setting ($SETTING_ID)..."
curl -s -X DELETE "$BASE_URL/settings/$SETTING_ID"
echo "Deleted."
echo ""

echo "7. Verifying Deletion (Should be 404)..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/settings/$SETTING_ID")
echo "HTTP Code: $HTTP_CODE"

if [ "$HTTP_CODE" -eq 404 ]; then
    echo "Verification Successful!"
else
    echo "Verification Failed: Expected 404, got $HTTP_CODE"
fi
