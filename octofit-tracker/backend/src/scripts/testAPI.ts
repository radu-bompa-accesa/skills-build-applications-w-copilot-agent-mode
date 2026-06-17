import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const testAPI = async () => {
  try {
    console.log('🧪 Testing OctoFit Tracker API...\n');

    // Test health endpoint
    console.log('1️⃣  Testing Health Endpoint');
    const healthRes = await axios.get('http://localhost:8000/api/health');
    console.log('✅ Health Check:', healthRes.data);

    // Test Get All Users
    console.log('\n2️⃣  Testing Get All Users');
    const usersRes = await axios.get(`${API_BASE_URL}/users`);
    console.log(`✅ Retrieved ${usersRes.data.data.length} users`);
    const userId = usersRes.data.data[0]?._id;

    // Test Get Workouts by User
    if (userId) {
      console.log('\n3️⃣  Testing Get Workouts by User');
      const workoutsRes = await axios.get(`${API_BASE_URL}/workouts/user/${userId}`);
      console.log(`✅ Retrieved ${workoutsRes.data.data.length} workouts for user`);

      // Test Get Goals by User
      console.log('\n4️⃣  Testing Get Goals by User');
      const goalsRes = await axios.get(`${API_BASE_URL}/goals/user/${userId}`);
      console.log(`✅ Retrieved ${goalsRes.data.data.length} goals for user`);

      // Test Get Active Goals
      console.log('\n5️⃣  Testing Get Active Goals');
      const activeGoalsRes = await axios.get(`${API_BASE_URL}/goals/user/${userId}/active`);
      console.log(`✅ Retrieved ${activeGoalsRes.data.data.length} active goals`);
    }

    console.log('\n✨ All API tests passed!');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ API Test Error:', error.response?.data || error.message);
    } else {
      console.error('❌ Error:', error);
    }
    process.exit(1);
  }
};

testAPI();
