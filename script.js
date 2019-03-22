
/*Fly Lab Script*/

/*---Installation---*/
/*

1. Create new Google Form
2. Click on "More" on the top tool-bar
3. Then click on Script Editor on the drop-down menu
4. Copy paste this entire text into the "Code.gs" file
5. Click the "Run" option on the top tool-bar.
6. Then click "Run Function" 
7. On the menu that pops out, click the first option "main"
8. When it asks to save, click "Yes" 
9. Then authorize the script to use the form by following the prompts

*/

/*---Troubleshooting Steps---*/
/*
1. Refresh the script's authorization by running it again
2. Check the errors reported in the log by clicking "View" then "Logs" or by pressing Ctrl+Enter
3. Check the extended logs by clicking "View" and "Executions"
4. Report the errors to the 
*/

/*---Main Settings---*/

TITLE = "Fly Lab"
FORM_DESCRIPTION = "Description"
TRAITS = ["Trait 1", "Trait 2", "Trait 3"]
EMAIL_SUBJECT = "Fly Lab"

/*---Script---*/

 
//Main function that calls other functions
function main() {
	//Creates the Google Forms
	createMainForm();
	//Creates a trigger that activates when a user submits a form
	onSubmit();
	//Sends the email 
	MailApp.sendEmail(RECEPIENT, EMAIL_SUBJECT, BODY),
}
}

//Automatically creates the forms for the pages 
function createMainForm() {
	
	//Form setup:
    var form = FormApp.getActiveForm();
    clearForm(form);
    form.setTitle(TITLE);
    form.setDescription(FORM_DESCRIPTION);
    form.setCollectEmail(true);
    
	//Page 2 of form: Adds three dropdowns for traits
	page2 = form.addPageBreakItem().setTitle('Trait Selection');
	
    list = TRAITS;
    
    traits = form.addListItem();
    traits.setTitle("Trait 1").setRequired(true);
	setChoiceList(list, traits);
    
    traits = form.addListItem();
    traits.setTitle("Trait 2").setRequired(true);
	setChoiceList(list, traits);
    
    traits = form.addListItem();
    traits.setTitle("Trait 3").setRequired(true);
	setChoiceList(list, traits);
    
	//Page 3 of form: Adds CheckboxGrid for Crosses
	page3 = form.addPageBreakItem().setTitle('Fly Cross');
	var item = form.addCheckboxGridItem().setRequired(true);
    item.setTitle('Select Traits (Mutant Traits)');
    item.setRows(['Male Fly', 'Female Fly']);
    item.setColumns(['Trait 1', 'Trait 2', 'Trait 3']);
    item.isRequired(true);
}

/*---Genetic Cross Functions---*/

/*
Base fly cross function, each argument is list of 
[trait1 gene, trait2 gene, trait3 gene]
*/
function cross(traits, flyMale, flyFemale) {
  
}

//Calculates
function calcuateLinkage() {
  
}

/*---Script Utilities---*/

//Detects when a user submits a form
function onSubmit() {
  Logger.log("Submission detected...")
  var form = FormApp.getActiveForm();
  ScriptApp.newTrigger('myFunction')
    .forForm(form)
    .onFormSubmit()
    .create();
}


//Set choices to form from a list
function setChoiceList(list, parent) {
	choices = []
	for(var i=0; i<list.length; i++){
		choices.push(parent.createChoice(list[i]));
	}
	parent.setChoices(choices);
}

//Clears the form for all items
function clearForm(form){
  Logger.log("Clearing Form...");
  var items = form.getItems();
  while(items.length > 0) {
    form.deleteItem(items.pop());
  }
}


//Creates the text for sending the email
function formatEmail() {
  
}


