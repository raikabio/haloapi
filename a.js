// a.js

async function hello() {
  try {
    const response = await fetch('https://haloapi-gray.vercel.app/api/user');

    // If the server returns a 500, 404, etc., handle it cleanly
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Server Error (${response.status}):`, errorText);
      return;
    }

    // Safely parse JSON once we know the response is successful
    const data = await response.json();
    console.log("✅ Success! Received Data:", data);

  } catch (error) {
    console.error("❌ Network or Fetch Error:", error.message);
  }
}

hello();