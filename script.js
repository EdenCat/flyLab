/*------Fly Lab Script------*/
/*
This modifies a Google Form and sends an email on the submission based on the cross inputted.
Traits are defined in the settings section.
*/
 
/*---Installation---*/
/*
1. Create new Google Form
2. Click on "More" on the top tool-bar
3. Then click on Script Editor on the drop-down menu
4. Copy paste this entire text into the "Code.gs" file
5. Press Ctrl+S to save the script and follow the prompts
6. Click the "Run" option on the top tool-bar.
7. Then click "Run Function" 
8. On the menu that pops out, click the first option "main"
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
 
TITLE = "Fly Lab";
FORM_DESCRIPTION = "Description";
EMAIL_SUBJECT = "Fly Lab";
MAXIMUM_TRAITS = 3;
/*--Trait Settings---*/
TRAITS = ["Trait 1", "Trait 2", "Trait 3"];
TRAITS_DOMINANCE = [true, false, true];
TRAITS_SEX_LINKAGE = ['X', 'Y', 'X'];
TRAITS_LINKED = [("Trait", 0),("Trait", 1), ("Trait", 100)];

/*--Other Settings---*/ 
MAXIMUM_FORM_TRIES = 10;

 
/*---Script---*/
 
  

function init() {
    //Create's the configuration form
    
}

//Main function that calls other functions
function main(){
    //Creates the Submition Form
    createMainForm();
    //Creates a trigger that activates when a user submits a form
    createFormTrigger();
    //Sends the email 
    sendEmail();
}

//Creates the configuration form that allows input

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
    item.setRequired(true);
}
 
/*---Genetic Cross Functions---*/
 
/*
Base fly cross function, each fly is list of 
[trait1, trait2,... traitn]
*/
function cross(flyMale, flyFemale) {
  flyMale = ["Mutant","Mutant", "Mutant"];
  flyFemale = ["Mutant", "Wild Type", "Mutant"];
  //Gets the trait settings
  traits = TRAITS;
  dominance = TRAITS_DOMINANCE;
  sexLinkage = TRAITS_SEX_LINKAGE;
  linkage = TRAITS_LINKED;
  
  //Generate Flies Genotypes
  var genesFemale = convertToGenotype(flyFemale);
  var genesMale = convertToGenotype(flyMale);
  Logger.log(genesFemale);
  Logger.log(genesMale);
  //Creates the gamete cells
  genesFemale = splice(genesFemale);
  genesMale = splice(genesMale);
  Logger.log(genesFemale);
  Logger.log(genesMale);
  var punnetSquare = createSquare(TRAITS, genesFemale, genesMale);
  Logger.log(punnetSquare);
  //Crosses the genes and creates a punnet square
  //Returns [[trait,percentage]]
  //return offspringPhenotype;
}

//Creates the punnett square and puts the genes into it.
function createSquare(traits, genesFemale, genesMale){
  var square = [];
  for(var i = 0; i<traits.length*2; i++){
    for(var j = 0; j<traits.length*2; j++){
      temp = "";
      for(var k = 0; k<traits.length; k++){
        temp += genesFemale[i].slice(k, k+1) + genesMale[j].slice(k, k+1);
      }
      square.push(temp);
    }
  }
  return square;
}

//Return all possible combinations from a list of alleles [trait1trait2trait3,
function splice(traits){
  temp =[];
  var combinations = Math.pow(2,TRAITS.length)
  var temp = fill("", combinations, temp);
  for(var i=0;i<TRAITS.length;i++){
    write1 = true;
    switches = Math.pow(2,i+1)
    counter = 1;
    for(var j=0; j<combinations;j++){
      if(j == (combinations/switches)*counter){
        counter++;
        write1 = !write1;
      }
      if(write1){
        temp[j] += traits[i].slice(0,1)
      }
      else{
       temp[j] += traits[i].slice(1,2)
      }
    }
  }
  return temp;
}

//Converts traits to genotypes
function convertToGenotype(traits){ 
  temp = [];
  //for(var i=0; i<TRAITS.length; i++){
    for(var j=0; j <TRAITS.length; j++){
      if(traits[j] == "Mutant"){
        if(TRAITS_DOMINANCE[j])
        {
          temp.push("AA");
        }
        else
        {
          temp.push("aa");
        }
      }
      else{
        if(TRAITS_DOMINANCE[j]){
          temp.push("aa");
        }
        else
        {
          temp.push("AA");
        }
      }
    }
  //}
  return temp;
}

//Converts genotypes to traits
function convertToTrait(oldTraits, genotype) {
  newTraits = [];
  for(var i; i <genotype.length/2; i++){
  
  }
}

/*---Form Utilities---*/
 
//Detects when a user submits a form
function createFormTrigger() {
  var form = FormApp.getActiveForm();
  ScriptApp.newTrigger('onSubmitTrigger')
    .forForm(form)
    .onFormSubmit()
    .create();
}

//What happens when a form is submitted
function onSubmitTrigger() {
  Logger.log("Submission detected...");
  var SUBMISSION = true;
}
 
 
//Set choices to form from a list
function setChoiceList(list, parent) {
    choices = [];
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

//Clears the responses form
function clearResponses(form){
  var form = FormApp.getActiveForm();
  var formResponses = form.getResponses();
  while(items.formResponses > 0) {
    form.deleteItem(items.pop());
  }
}

//Clears the form and adds a message
function lockForm(form, message) {
  var form = FormApp.getActiveForm(); 
  form.setCollectEmail(false);
  clearForm(form);
  title = form.addSectionHeaderItem();
  title.setHelpText("Lockout Help Text");
  title.setTitle("Lock Out Title");
}

//Gets the last submition to the form
function getLatestReponse() {
    var tries = 0;
    Logger.log("Submition Accepted!!!");
    var form = FormApp.getActiveForm();
    var formResponses = form.getResponses();
    try{
      tries++;
      var latestResponse = formResponses[formResponses.length-1];
      var responseEmail = latestResponse.getRespondentEmail();
    }
    catch(ArrayIndexOutOfBounds) {
      Logger.log("Unable to access the form response, please check execution logs or try again");
      if(tries != MAXIMUM_FORM_TRIES){
        getLatestResponse();
      }
    }
}

//Creates the text for sending the email
function sendEmail() {
  var mail = MailApp;
  var remaining = mail.getRemainingDailyQuota();
  if (remaining == 0){
    Logger.log("No more emails left in daily quota, please wait for it to refresh and try running the script again");
    Logger.log("See here for more information: https://developers.google.com/apps-script/guides/services/quotas");
    logForm();
    throw('Email Quota Limit Reached');
  }
  RECEPIENT = "email";
  EMAIL_SUBJECT = "Test Subject";
  BODY = "hello";
  mail.getRemainingDailyQuota();
  try{
    mail.sendEmail(RECEPIENT, EMAIL_SUBJECT, BODY);  
  }
  catch(err){
  
  }
}

/*---Script Utilities---*/

//Returns a array that is filled with string for length
function fill(string, length){
  temp = [];
  for(var i=0; i<length; i++){
    temp[i] = string;
  }
  return temp;
}
