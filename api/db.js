import mysql from "mysql"

export const db = mysql.createConnection({
  host:"bc5bcvthns5w00zwdemi-mysql.services.clever-cloud.com",
  user:"ujvivzfsvaipc3uw",
  password: "AgonXidg8tJosRkMxLys",
  database:"bc5bcvthns5w00zwdemi"
//   MYSQL_ADDON_HOST=bc5bcvthns5w00zwdemi-mysql.services.clever-cloud.com
// MYSQL_ADDON_DB=bc5bcvthns5w00zwdemi
// MYSQL_ADDON_USER=ujvivzfsvaipc3uw
// MYSQL_ADDON_PORT=3306
// MYSQL_ADDON_PASSWORD=AgonXidg8tJosRkMxLys
// MYSQL_ADDON_URI=mysql://ujvivzfsvaipc3uw:AgonXidg8tJosRkMxLys@bc5bcvthns5w00zwdemi-mysql.services.clever-cloud.com:3306/bc5bcvthns5w00zwdemi

})
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected! to database");
});
