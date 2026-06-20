// a.js
async function testMediaRoute() {
  try {
    const response = await fetch('http://localhost:5000/api/media');
    const data = await response.json();
    console.log("✅ Success! Catalog Data Payload:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("❌ Test Failed:", error.message);
  }
}

testMediaRoute();