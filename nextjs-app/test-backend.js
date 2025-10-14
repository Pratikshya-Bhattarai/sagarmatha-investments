// Test script to verify backend connection
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function testBackend() {
  console.log('🧪 Testing backend connection...');
  console.log('API URL:', API_URL);
  
  try {
    // Test market overview endpoint
    const response = await fetch(`${API_URL}/overview/overview/`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend is working!');
      console.log('📊 Market data:', data);
    } else {
      console.log('❌ Backend error:', response.status, response.statusText);
    }
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    console.log('💡 Make sure your backend is deployed and running');
  }
}

testBackend();
