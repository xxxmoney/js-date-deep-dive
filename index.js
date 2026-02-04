
//
//
// Date - a built-in object used to work and represent DateTime in JavaScript
//
//



//
// Prelude to Date - what's time zone
//

// Before we dive deep into Date, let's firstly talk about time zone - what the hell is it?
// Let's focus on real world as example
// In real world, the time isn't same everywhere
// For example, when it's 12:00 (noon) in London, it's already 7:00 in New York, USA, and 13:00 in Prague, Czechia
// This is because of time zones - the Earth is divided into different time zones based on longitude
// TLDR: different part of our planet has different time (thus time zones)

// Now, to make sense and standardize this, there is a concept of UTC - Coordinated Universal Time
// This is essentially the "base" of time zones
// All time zones are defined as an offset from UTC
// For example:
// - London is usually UTC+0 - plus 0 hours - same as UTC
// - New York is usually UTC-5 - minus 5 hours from UTC
// - Prague is usually UTC+1 - plus 1 hour from UTC
// TLDR: UTC is the base time, other time zones are defined as offsets from it

// Note: Many time zones also have Daylight Saving Time (DST) - where the clocks are adjusted forward or backward by one hour during certain periods of the year
// But we don't need to go into details of this now

// To sum up the time zone
// Let's have an example of local date
// - 1st January 2023, 12:00
// To have this date represented in UTC, for the time zone plus 1, we need to subtract 1 hour
// - 1st January 2023, 11:00 UTC
// This is the default behavior of console.log - it uses UTC



//
// The Basics of Date
//


/* What's date and what's underneath */

// Creating a new Date object is simple
const now = new Date(); // This creates a new Date object which represent the current date and time - as of creation of the object
console.log("Now", now); // We can also output it - it uses the default string representation
// Let's use the knowledge of time zones right away - why does this output may differ from our clock on our computer?
// It's because console log of date outputs the date in UTC
// Because of time zone - for example if you are in Prague, which is UTC+1, the time in Prague is 1 hour ahead
// To make this UTC, it has to be subtracted by 1 hour
// That's why in Prague the printed date is one hour behind the actual local time
// With this first caveat in mind, let's now focus on the date itself (as we now understand why it prints the date this way)

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
// (Keep in mind there are different types of handling - some create a date in UTC, some in local time zone, etc.)
// - Date formats are usually defined as follow YYYY for year, MM for month, DD for day, hh for hour, mm for minute, ss for second
// - With this, we can "combine" these parts to create different formats, for example: "YYYY-MM-DD", "MM/DD/YYYY", "YYYY-MM-DDThh:mm:ss" (T is just the separator, Z means UTC time zone), etc.
// My recommandation is the ISO 8601 format - YYYY-MM-DDThh:mm:ssZ
// - The Z suffix is important - it says to use UTC
const dateFromISO = new Date("2001-11-09T14:46:00Z");
console.log("Date from ISO string UTC:", dateFromISO);
// We could make a similar example without the Z - it would now use local tiem zone
const dateFromISOWithoutZ = new Date("2001-11-09T14:46:00"); // This one uses local time zone of the environment
console.log("Date from ISO string without Z (local time zone):", dateFromISOWithoutZ);
// There is also the ISO 8601 date only format - YYYY-MM-DD - specified without time - uses midnight (00:00) as time
const dateOnlyFromISO = new Date("2021-11-09"); // This is interesting because this format uses UTC
console.log("Date from YYYY-MM-DD string UTC:", dateOnlyFromISO);
// There are also other formats which may or may not work across browsers, for example YYYY-MM-DD, MM/DD/YYYY, etc.
const dateFromUnreliableFormat = new Date("11/09/2021"); // This format is NOT UTC, it uses local time zone
console.log("Date from another unreliable MM/DD/YYYY string:", dateFromUnreliableFormat);

// 4: Creating a Date from individual parts
// - A great option - specifies the parts specifically
const dateFromParts = new Date(2001, 10, 9, 14, 46, 0); // Year, Month, Day, Hour, Minute, Second. Note: Month is zero-based! (0 = January, 10 = November)
console.log("Date from parts:", dateFromParts); // You might notice it might actually be a bit differnet then the ISO format (that's because of time zones)



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

const sampleDate = new Date("2011-11-18T13:40:42.333Z"); // November 18, 2011 (the .333 is milliseconds part)


/* Getting parts of Date */
// Keep in mind these methods work in local time zone (UTC will be used in later sections):

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
// Getting timestamp
const sampleTimestamp = sampleDate.getTime(); // Number of milliseconds since Unix Epoch
console.log("Sample date Timestamp (ms since Unix Epoch):", sampleTimestamp);


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
// Setting timestamp (basically overwrites the whole date)
sampleDate.setTime(1321632042333); // Sets the timestamp to the given value
console.log("Sample date after setting Timestamp UTC:", sampleDate);

/* Date math - AKA how to calculate with dates */
const anotherDate = new Date("2023-01-31T00:00:00Z"); // January 31, 2023
anotherDate.setDate(anotherDate.getDate() + 5); // Add 5 days
console.log("Another date after adding 5 days UTC:", anotherDate); // It correctly rolls over to February - we don't need to worry about that
// It also works with hours
anotherDate.setHours(anotherDate.getHours() + 48); // Add 48 hours (2 days)
console.log("Another date after adding 48 hours UTC:", anotherDate); // It correctly rolls over the days



//
// Date calculation - how to calculate differences between dates
//

// Now we have also acquired knowledge regarding Date methods
// But, in case when we have two dates, how to get their difference?
// For example, how many days are between two dates?

const startDate = new Date("1939-09-01T00:00:00Z"); //September 1, 1939
console.log("Start Date UTC:", startDate);
const endDate = new Date("1945-05-08T00:00:00Z"); // May 8, 1945
console.log("End Date UTC:", endDate);
// Get both dates as timestamps and subtract them to get the difference in milliseconds
const differenceInMilliseconds = endDate.getTime() - startDate.getTime(); 
console.log("Difference in milliseconds:", differenceInMilliseconds);
// We can then calculate the difference in days
const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24; // Number of milliseconds in a day
const differenceInDays = differenceInMilliseconds / MILLISECONDS_IN_A_DAY;
console.log("Difference in days:", differenceInDays);

// And this is how we can get difference between two dates - we need to use the timestamps, calculate the difference
// We then need to convert the timestamp to our desired difference - like to days, hours, minutes, etc.



//
// Working with time zones
//

// Now we now the ins and outs of Date, its methods, calculations, etc
// But how about the time zone - in the beginning, we understood, what it is, but can we work with Date more efficiently regarding time zones?
// Yes and No


/* String representation */

// As we know, the console.log by default uses UTC ISO Format representation
// But we have more ways of getting string represenation of Date
const nowAsLocalTimeString = now.toString();
console.log("Now as local time string:", nowAsLocalTimeString); // This outputs the date in local time zone of the environment where the code is running, along with time zone itself
const nowAsUTCString = now.toUTCString();
console.log("Now as UTC string:", nowAsUTCString); // Also UTC, but different format
const nowAsISOString = now.toISOString();
console.log("Now as ISO string:", nowAsISOString); // This outputs the date in ISO 8601 format in UTC - basically the default console.log format


/* Getting parts */

// In some previous section, we got to know methods for getting parts of the date - hours, minutes, etc
// These methods work in local time zone
// We also have their UTC counterparts
const sampleDate2 = new Date("2011-11-18T13:40:42.333Z"); // November 18, 2011 (the .333 is milliseconds part)
// Getting year in UTC
const yearUTC = sampleDate2.getUTCFullYear();
console.log("Sample date Year UTC:", yearUTC);
// Getting month in UTC
const monthUTC = sampleDate2.getUTCMonth();
// We could write the other ones here, but you get the idea...


/* The time zone value itself */

// Important thing - as mentioned, the Date itself is just a timestamp - it doesn't have time zone information in itself
// The timestamp itself is always in UTC - it's the number of milliseconds since January 1, 1970, 00:00:00 UTC!
// Meaning the timezone is not stored in Date - the browser uses the local time zone of the environment

// We can get the timezone this way
const timezoneOffsetInMinutes = now.getTimezoneOffset(); // This returns the time zone offset in minutes from UTC - but it's "backwards" - if we have UTC+1, it returns -60
console.log("Timezone offset in minutes from UTC:", timezoneOffsetInMinutes); 
// This essentially returns the difference between what we see in console.log and the actual local time - like in Prague, which is UTC+1 
// - It returns -60, which means it subtracts 60 minutes (1 hour) to get the UTC time
// - Which is what we see in console.log



//
// Locale
//


/* The hell is locale? */ 

// We live in society - meaning there are many countries, regions, cultures, etc
// Each of this might like to display data differently
// This also includes dates - for example, in US, the date is usually displayed as "MM/DD/YYYY", while in parts of Europe it's "DD/MM/YYYY", etc


/* Locale - each nation to its own, duh */

// Locale - set of parameters that define the language, region, and cultural preferences for the user
// Sounds fancy, but TLDR it's how to display the data for specific country/region

// The Code - an identifier for locale
// - en-US: English language as spoken in the United States
// - en-GB: English language as spoken in Great Britain
// - cs-CZ: Czech language as spoken in the Czech Republic
// - de-DE: German language as spoken in Germany

// And behold - each of these locales has its own way of displaying dates
// (remember the date format as metnioned in previous sections? to remember, it just means: YYYY for year, MM for month, DD for day, hh for hour, mm for minute, ss for second - and we can combine these in different ways to create different formats)
// Let's use example of 11 September 2021:
// - en-US: MM/DD/YYYY: 09/11/2021
// - en-GB: DD/MM/YYYY: 11/09/2021
// - cs-CZ: DD.MM.YYYY: 11.09.2021
// - de-DE: DD.MM.YYYY: 11.09.2021



//
// Date formatting - alas the pain begins
//

// We have essentially bumped a tiny bit into this - but what we would like to do is format our date in a specific way - for example, we want to display it as "DD/MM/YYYY", or "YYYY-MM-DD", etc
// Can we do this - again Yes and No


/* The built-in formatting options */

// As mentioned before, we can use sinmple methods like .toString(), .toUTCString(), .toISOString()...
// Alas, we might want to use different format - like for some locales - as mentioned in previous section
// We can use this because in JavaScript, we can use built-in formatting for different locales

// For this, behold, the date formatter
// We use the Intl.DateTimeFormat built-in object - used specifically for formatting dates
// We can also specify some options - like if we want short date, long date, etc

// For the options we can specify:
// - dateStyle: "full", "long", "medium", "short" - format of the date part (day, month, year)
// - timeStyle: "full", "long", "medium", "short" - format of the time part (hour, minute, second)
// - timeZone: "UTC", "America/New_York", etc - time zone used for formatting (if not specified, uses the local time zone)
const options = { dateStyle: "short", timeStyle: "medium", timeZone: "Australia/Sydney" };
const dateFormatterUS = new Intl.DateTimeFormat("en-US", options); // This creates a date formatter for US locale
const dateFormatterGB = new Intl.DateTimeFormat("en-GB", options); // This creates a date formatter for Great Britain locale
const dateFormatterCZ = new Intl.DateTimeFormat("cs-CZ", options); // This creates a date formatter for Czech Republic locale
const dateFormatterDE = new Intl.DateTimeFormat("de-DE", options); // This creates a date formatter for Germany locale   

// Now we can use these formatters to format our date
const dateToFormat = new Date("2021-09-11T02:00:00Z"); // September 11, 2021 02:00 UTC
// The dates printed below have time of 12:00 - that's because in the formatter we use the Sydney time zone (UTC+10)
console.log("Date formatted for US locale:", dateFormatterUS.format(dateToFormat)); // 9/11/21, 12:00 AM
console.log("Date formatted for Great Britain locale:", dateFormatterGB.format(dateToFormat)); // 11/09/21, 12:00 AM
console.log("Date formatted for Czech Republic locale:", dateFormatterCZ.format(dateToFormat)); // 11.09.21, 12:00 AM
console.log("Date formatted for Germany locale:", dateFormatterDE.format(dateToFormat)); // 11.09.21, 12:00 AM

// Let's have an example - let's create a now date, then set it to yesterday, and then format it to our local time zone
const exampleCurrentDate = new Date(); // Date now
exampleCurrentDate.setDate(exampleCurrentDate.getDate() - 1); // Set to yesterday - 1 day back
const localFormatter = new Intl.DateTimeFormat(navigator.language, { dateStyle: "medium", timeStyle: "medium" }); // We are omitting the timeZone - it wil use the local time zone
console.log("Date formatted for local locale:", localFormatter.format(exampleCurrentDate));

