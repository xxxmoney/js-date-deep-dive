
//
// Date - a built-in object used to work and represent DateTime in JavaScript
//

//
// The Basics of Date
//

/* What's date and what's underneath */

// Creating a new Date object is simple
const now = new Date(); // This creates a new Date object which represent the current date and time - as of creation of the object
console.log("Now default formatting", now); // We can also output it - it uses the default string representation

// Before we dwelve deeper, into its methods and how to further use it, let's firstly understand one thing - what it really is
// The Date object is internally just a wrapper around a number
// It holds a number inside of it and has bunch of methods to work with it (we will learn about these later)
// Don't believe me? Let's try converting it to a number
const timestamp = Number(now); // This converts the Date to its underlying number representation 
console.log("Now as timestamp number", timestamp);
// We can also get the same with .getTime() method
const timestampViaMethod = now.getTime();
console.log("Now as timestamp via getTime()", timestampViaMethod);

// But what's the number?
// It's called Unix Epoch number
// It's simply the number of milliseconds since January 1, 1970, 00:00:00 UTC
// https://developer.mozilla.org/en-US/docs/Glossary/Unix_time

/* Multiple ways of creating new Date, the dangers */

// Great, so now we understand the basics of Date - what it is, and it's simple creation
// But, there are actually multiple ways of creating it!

// 1: Creating a current Date
const currentDate = new Date(); // Simply using the constructor without parameters - this creates the current Date object

// 2: Creating a Date object with timestamp (number of milliseconds since Unix Epoch)
const dateFromTimestamp = new Date(1000219560000); // This creates a Date object representing the date and time for the given timestamp
console.log("Date from timestamp:", dateFromTimestamp);
// You can try creating timestamps using this site: https://www.epochconverter.com

// 3: Creating a Date object from a date string
// For this usage, it's important to understand that there are multiple formats of date strings
// - Date formats are usually defined as follow YYYY for year, MM for month, DD for day, hh for hour, mm for minute, ss for second
// - With this, we can "combine" these parts to create different formats, for example: "YYYY-MM-DD", "MM/DD/YYYY", "YYYY-MM-DDThh:mm:ss" (T is just the separator, Z means UTC time zone - on this later on), etc.
// My recommandation is the ISO 8601 format - YYYY-MM-DDThh:mm:ssZ
const dateFromISOString = new Date("2001-11-09T14:46:00Z");
console.log("Date from ISO string:", dateFromISOString);
// There is also the ISO 8601 date only format - YYYY-MM-DD - specified without time - uses midnight (00:00) as time
const dateOnlyFromISOString = new Date("2021-11-09"); // This is treated similarly to the previous one, but it also has its caveats, to rather use the first one
console.log("Date from unreliable YYYY-MM-DD string:", dateOnlyFromISOString);
// There are also other formats which may or may not work across browsers, for example YYYY-MM-DD, MM/DD/YYYY, etc.
const dateFromUnreliableFormatString = new Date("11/09/2021"); // This one for example is not treated same as the ISO 8601 formats
console.log("Date from another unreliable MM/DD/YYYY string:", dateFromUnreliableFormatString);

// 4: Creating a Date from individual parts
// - A great option - specifies the parts specifically
const dateFromParts = new Date(2001, 10, 9, 14, 46, 0); // Year, Month, Day, Hour, Minute, Second. Note: Month is zero-based! (0 = January, 10 = November)
console.log("Date from parts:", dateFromParts);


