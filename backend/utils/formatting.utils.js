const formatDateForDatabase = (unformattedDate) => {
   const year = unformattedDate.getFullYear();
   const month = (unformattedDate.getMonth() + 1).toString().padStart(2, "0");
   const day = unformattedDate.getDate().toString().padStart(2, "0");
   const hours = unformattedDate.getHours().toString().padStart(2, "0");
   const minutes = unformattedDate.getMinutes().toString().padStart(2, "0");
   const seconds = unformattedDate.getSeconds().toString().padStart(2, "0");

   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

module.exports = {
   formatDateForDatabase,
};
