
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
// Important note - keep in mind dates logged into console might be a bit differnt - like differece of one hour - that's because of time zone - will be covered later (will mention this more times)
// For this usage, it's important to understand that there are multiple formats of date strings
// - Date formats are usually defined as follow YYYY for year, MM for month, DD for day, hh for hour, mm for minute, ss for second
// - With this, we can "combine" these parts to create different formats, for example: "YYYY-MM-DD", "MM/DD/YYYY", "YYYY-MM-DDThh:mm:ss" (T is just the separator, Z means UTC time zone - on this later on), etc.
// My recommandation is the ISO 8601 format - YYYY-MM-DDThh:mm:ssZ
const dateFromISOString = new Date("2001-11-09T14:46:00Z");
console.log("Date from ISO string UTC:", dateFromISOString);
// There is also the ISO 8601 date only format - YYYY-MM-DD - specified without time - uses midnight (00:00) as time
const dateOnlyFromISOString = new Date("2021-11-09"); // This is treated similarly to the previous one, but it also has its caveats, to rather use the first one
console.log("Date from YYYY-MM-DD string UTC:", dateOnlyFromISOString);
// There are also other formats which may or may not work across browsers, for example YYYY-MM-DD, MM/DD/YYYY, etc.
const dateFromUnreliableFormatString = new Date("11/09/2021"); // This one for example is not treated same as the ISO 8601 formats
console.log("Date from another unreliable MM/DD/YYYY string:", dateFromUnreliableFormatString);

// 4: Creating a Date from individual parts
// - A great option - specifies the parts specifically
const dateFromParts = new Date(2001, 10, 9, 14, 46, 0); // Year, Month, Day, Hour, Minute, Second. Note: Month is zero-based! (0 = January, 10 = November)
console.log("Date from parts:", dateFromParts); // You might notice it might actually be a bit differnet then the ISO format (that's because of time zones, on that, later on)


//
// The Caveats, Pitfalls and bad stuff of Date
//

/* The 0 indexed month */

// As mentioned already, Date can be created with multiple parameters passed to the constructor
// For year, month, day, hour, minute, second, millisecond

// In the example above, we created a Date for November 9, 2001, 14:46:00
new Date(2001, 10, 9, 14, 46, 0); // But why do we use 10 for month?
// Because month is zero-based! (0 = January, 10 = November) - as mentioned above
// It's important to remember this

// So if wanted to create a Date for December 24, 2022, we would do:
const christmas2022 = new Date(2022, 11, 24); // 11 for December
console.log("Christmas 2022:", christmas2022);

/* Mutability and copying */

// Date object is mutable - meaning if we alter it with some methods, it changes the original object
// This might not be desirable sometimes - for example in C#, the methods usually craete a new date object

// Alas, we are in JavaScript - we will look through the methods more in detail later
// But let's look at this simple example

const originalDate = new Date("2001-11-09T14:46:00Z"); // January 1, 2022
console.log("Original date before mutation UTC:", originalDate);

const linkToOriginal = originalDate; // This is a reference to the original date

// Now, let's say we want to add 2 years to this date
linkToOriginal.setFullYear(linkToOriginal.getFullYear() + 2); // This mutates the original date object
console.log("Original date after mutation (added 2 years) UTC:", originalDate); // The original date is now changed
// This behavior might not be expected or wanted, so keep it in mind

// We can do the "fix" ourselves - we can create a new instance instead of using a reference
// Remember how the Date object is just a timestamp in miliseconds?
// We can just get this timestamp and create new date with it!
const anotherOriginalDate = new Date("2001-11-09T14:46:00Z");
const copyOfAnotherOriginalDate = new Date(anotherOriginalDate.getTime()); // .getTime gets the timestamp, and with the consturctor, we create a new date with the same value
const copyOfAnotherOriginalDateShorter = new Date(anotherOriginalDate); // This would also work - it would convert the date to timestamp
anotherOriginalDate.setFullYear(anotherOriginalDate.getFullYear() + 2); // Mutate the original date
console.log("Copy of another original date UTC:", copyOfAnotherOriginalDate); // And this stays the same because it's a new instance
console.log("Copy of another original date (short creation version) UTC:", copyOfAnotherOriginalDateShorter); 

/* Issues with old dates */

// Now, as we know, the Date is interanlly just a Unit Timestampt - number of milliseconds since January 1, 1970, 00:00:00 UTC
// Well, how can we then represent dates before this date?

// Let's try what happens
const oldDate = new Date(1945, 7, 6); // August 6, 1945
console.log("Old date:", oldDate); // Interesting, this actually works, how?
// Let's take a look at the timestamp
const oldDateTimestamp = oldDate.getTime();
console.log("Old date timestamp (ms since Unix Epoch):", oldDateTimestamp); // It's negative!
// So the solution for represenation of dates before 1970 is simply using negative timestamps

// This works fine, but let's try very historical dates
const maybeVeryOldDate = new Date(15, 0, 1); // January 1, 0015
console.log("Maybe very old date:", maybeVeryOldDate); // Huh, this looks wrong
// This is an old feature - if the year is between 0 and 99, it's treated as 1900 + year

// To fix this, we can use .setFullYear() method
maybeVeryOldDate.setFullYear(15); // Set the full year to 15
console.log("Maybe very old date after setFullYear:", maybeVeryOldDate); // Now it's correct

// Btw, this would this issue could be fixed with using the string format and ISO format (but this is demonstration of the JavaScript issues and limitations)
// Let's try it
const veryOldDate = new Date("0015-01-01T00:00:00Z");
console.log("Very old date from ISO string UTC:", veryOldDate); // This works fine

//
// Date methods - AKA how to work with Date
//

// As we now know the basics of date, what is it comprised of, caveats and ways of creating it
// We also would like to know how to work with it
// We are in luck (or not maybe so much so) - as there are methods Date has

/* Getting parts of the date */
const sampleDate = new Date("2011-11-18T13:40:42.333Z"); // November 18, 2011 (the .333 is milliseconds part)

// Getting year
const year = sampleDate.getFullYear(); // 4 digit year
console.log("Sample date Year:", year);
// Getting month
const month = sampleDate.getMonth(); // 0 indexed month (0 = January, 10 = November)
console.log("Sample date Month (0 indexed):", month);
// Getting day of month
const day = sampleDate.getDate(); // Day of the month (1-31)
console.log("Sample date Day of month:", day);
// Getting date of week
const dayOfWeek = sampleDate.getDay(); // Day of the week (0 = Sunday, 6 = Saturday)
console.log("Sample date Day of week (0=Sunday):", dayOfWeek);
// Getting hours
const hours = sampleDate.getHours(); // Hours (0-23)
console.log("Sample date Hours:", hours);
// Getting minutes
const minutes = sampleDate.getMinutes(); // Minutes (0-59)
console.log("Sample date Minutes:", minutes);
// Getting seconds
const seconds = sampleDate.getSeconds(); // Seconds (0-59)
console.log("Sample date Seconds:", seconds);
// Getting milliseconds
const milliseconds = sampleDate.getMilliseconds(); // Milliseconds (0-999)
console.log("Sample date Milliseconds:", milliseconds);

/* Setting parts of the date */

// Each of the get methods has a corresponding set method (except the getDay() method, as day of week is derived from the date):

// Setting year
sampleDate.setFullYear(2020); // Sets the year to 2020
console.log("Sample date after setting Year to 2020 UTC:", sampleDate);
// Setting month
sampleDate.setMonth(0); // Sets the month to January (0 indexed)
console.log("Sample date after setting Month to January UTC:", sampleDate);
// Setting day of month
sampleDate.setDate(15); // Sets the day of the month to 15
console.log("Sample date after setting Day of month to 15 UTC:", sampleDate);
// Setting hours
sampleDate.setHours(10); // Sets the hours to 10
console.log("Sample date after setting Hours to 10 UTC:", sampleDate);
// Setting minutes
sampleDate.setMinutes(30); // Sets the minutes to 30
console.log("Sample date after setting Minutes to 30 UTC:", sampleDate);
// Setting seconds
sampleDate.setSeconds(0); // Sets the seconds to 0
console.log("Sample date after setting Seconds to 0 UTC:", sampleDate);
// Setting milliseconds
sampleDate.setMilliseconds(500); // Sets the milliseconds to 500
console.log("Sample date after setting Milliseconds to 500 UTC:", sampleDate);




