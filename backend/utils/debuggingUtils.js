const debugConsoleLog = (message, label = "DEBUG") => {
   const error = new Error();

   const stackLines = error.stack.split("\n");

   let callerInfo = "unknown:unknown";

   if (stackLines.length >= 3) {
      const utilityFilePath = __filename;

      for (let i = 2; i < stackLines.length; i++) {
         const line = stackLines[i];
         const match =
            line.match(/\((.*):(\d+):(\d+)\)$/) ||
            line.match(/at (.*):(\d+):(\d+)$/);

         if (match) {
            const filePath = match[1];
            const lineNumber = match[2];

            if (!filePath.includes(utilityFilePath)) {
               const cleanedPath = filePath
                  .replace(/^(file:\/\/|webpack-internal:\/\/\/)/, "")
                  .replace(process.cwd(), ".");
               callerInfo = `${cleanedPath}:${lineNumber}`;
               break;
            }
         }
      }
   }

   console.log(`[${label}] [${callerInfo}]`, message);
};

module.exports = { debugConsoleLog };
