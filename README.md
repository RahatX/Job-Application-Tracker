## Questions and Answers

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
These methods are all used to select elements from the DOM, but they work a little differently.
- getElementById() is used when I want to select one element by its unique id. Since an id should only belong to one element, this method returns a single element.
- getElementsByClassName() selects all elements that have the same class name. It returns an HTMLCollection, not a single element.
- querySelector() is more flexible because it can select by id, class, tag, or even more complex CSS selectors, but it only returns the first matching element.
- querySelectorAll() also uses CSS selectors, but it returns all matching elements as a NodeList.

So, if I need something simple and specific like an id, I can use getElementById(). If I need more flexibility, querySelector() or querySelectorAll() is more useful.



### 2. How do you create and insert a new element into the DOM?
To create a new element in the DOM, first I use document.createElement(). After that, I can add text, class, attributes, or other content to that element. Then I place it inside the page by using methods like appendChild() or append().
For example, the general process is:
1. Create the element
2. Add content or class
3. Insert it into a parent element
This is useful when I want to show dynamic content using JavaScript instead of writing everything directly in HTML.


### 3. What is Event Bubbling? And how does it work?
Event bubbling means when an event happens on a child element, it does not stop there first. It starts from that target element and then moves upward step by step to its parent, grandparent, and so on.
For example, if I click a button inside a card, the click first happens on the button, then it bubbles up to the card, then maybe to the section, and then even to the document.This is how JavaScript events naturally travel in many cases, and it becomes very useful when handling events efficiently.


### 4. What is Event Delegation in JavaScript? Why is it useful?
Event delegation means attaching one event listener to a parent element instead of adding separate listeners to many child elements.Then, when I click on a child element, I can detect which exact child was clicked by using event.target or closest().
This is useful because:
- it reduces repeated code
- it improves performance
- it works well for dynamically added elements
In this project, event delegation is helpful because the job cards and their buttons are handled in a cleaner way using one listener.


### 5. What is the difference between preventDefault() and stopPropagation() methods?
These two methods are related to events, but they do different jobs.
- preventDefault() stops the browser’s default action. For example, it can stop a form from reloading the page after submission, or stop a link from opening immediately.
- stopPropagation() stops the event from moving upward to parent elements.
So, preventDefault() controls the browser’s built-in behavior, while stopPropagation() controls how the event travels in the DOM.

