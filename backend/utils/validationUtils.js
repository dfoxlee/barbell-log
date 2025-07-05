const checkEmail = (email) => {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
};

const checkPassword = (password) => {
   // Password must be at least 6 characters long
   return typeof password === "string" && password.length >= 6;
};

const checkWorkoutName = (workoutName) => {
   return typeof workoutName === "string" && workoutName.trim().length > 3 && workoutName.trim().length < 50;
}

module.exports = {
   checkEmail,
   checkPassword,
   checkWorkoutName
};
