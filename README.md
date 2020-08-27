# Morms
Morm is a library created to help you build forms with validation using material-ui. Morms displays the right error message at the right time, without writing any boilerplating.

A basic morms form could look like this:
```tsx
<Form>
    <Paper>
        <TextInput
            value={username}
            label={"Username"}
            onChange={(event) => {
                console.log(event.target.value);
            }}
            validators={[required(), minLength(8)]}/>
    </Paper>
    <SubmitButton
        variant="contained"
        color="primary"
        onSubmit={() => {
            console.log("Form is valid");
        }}>
        {"Submit"}
    </SubmitButton>
</Form>
```
This form has only one field, which is required. In this example `onSubmit` will only be called if the `TextInput` is not empty and the value is at least 8 characters long. In any other situation an error message will be displayed. Note that the `TextInput` does not need to be a direct child of `Form`. 

# Why
Validatying user input at the right time is tricky. Validating while the user is typing is frustrating to the user, because they might simply not be done yet. But only giving feedback
after a submit button is pressed means the user has to go back and fix things. Ideally you would only validate after a user is done typing. 

Morms handles this by using a Form component which stores all validation results of all InputFields. It will only show these results when the user leaves an InputField or when the `SubmitButton` is clicked.

Morms does _not_ handle changes in the fields. This is something left to the developer. 

# Validators
Morms can validate anything with the right validator.  A validator is function which accepts the value and returns if its valid. Morms includes a few validators, but is is easy to write your own.
Some examples of validators morms contains are: `minValue`, `minLenght` and `ipAddress`.

## Development
The included demo app can be used in while developing.

In the morms directory run 
```sh
npm run link
```
This links the build output from morms to the demo app

To automatically compile the package while developing run: 
```sh
npm run watch
```

In the demo directory start the the demo app like this:
``sh
npm run react-scripts start
```
You should now be able to open the demo app in the browser.

if everything is set up correctly the app should automatically include all changes done in the morms library.

