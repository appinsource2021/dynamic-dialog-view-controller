
# React Dynamic Dialog View

Component extended @mui/dialog, dynamic dialog view controller.
## Installation

```bash
  npm install @appinsource/material/dynamic-dialog
```
    
## Features

- High-performance
- Lazy-load with a custom function
- Ready to use



## API Reference

```http
  AISDialogActionViewController ( dialogActionView )
```

| Property  | Type                    | Description                |
| :-------- | -------                | ------------------------- |
| `setLabel` | `compoent or string` | **Required**. Button label |
| `setVariant` | `ButtonVariantType` | "contained","outlined","text"|
| `setColor` | `ActionColorTypes` | "inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning" |
| `setAction` | `Function` | "Callback Function returned ( button, dialog ):void "|
| `setDisabled` | `boolean` | "Disable/enable button"|
| `setInProcess` | `boolean` | "Show/hide button spinner"|
| `remove` | `void` | "Remove button"|

```http
  AISDialogViewController
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `setTitle` | `compoent or string` | dialog title |
| `setSubTitle` | `compoent or string` | "dialog subtitle"|
| `setContent` | `compoent or string` | "Dialog content"|
| `setAction` | `dialogActionView` | "Instance of AISDialogActionViewController"|
| `setActions` | `Array<dialogActionView>` | "Collection items instance of AISDialogActionViewController"|
| `setDraggable` | `boolean` | "Drag enable/disable" |
| `setMaxWidth` | `DialogMaxSizeType` | "xs", "sm", "md", "lg", "xl"|
| `show` | `void` | "Show dialog" |


## License
[MIT](https://choosealicense.com/licenses/mit/)

## Authors
Süleyman Topaloglu

## Usage/Examples
 - You have a complete working [Demo](https://codesandbox.io/s/dynamic-react-dialog-view-controller-yop9q5)


```javascript
    import React from 'react';
    import logo from './logo.svg';
    import './App.css';
    import Button from "@mui/material/Button";
    import AISDialogViewController, { dialogActionView } from "@appinsource/material/dynamic-dialog";

    function App() {

        const handleClick = () => {

            const closeAction = new dialogActionView()
                    .setLabel('Close')
                    .setAction((button, modal1) => {
                        modal1.close();
                    });

                const updateAction = new dialogActionView()
                    .setLabel('Update me')
                    .setVariant('contained')
                    .setColor('warning')
                    .setAction( (button, dialog) => {
                        dialog.setContent('Content updated and closing in 3 sec');
                        button.setInProcess(true).setDisabled( true ).setColor('success');
                        setTimeout(()=>{
                            dialog.setContent('Success');

                            button
                                .setLabel('Ok!')
                                .setDisabled(false)
                                .setInProcess(false)
                                .setVariant('text');

                            closeAction.remove();

                            button.setAction( ((button1, dialog1) => {
                                dialog1
                                    .setContent('Button Action changed another trigged will closing in 5 sec.');
                                button1.setLabel('Inline Clicked').setDisabled(true);
                                setTimeout(()=>{
                                    dialog1.setContent('Dialog closing in 3 sec');
                                    button1.setColor('warning').setDisabled(false);
                                    setTimeout(()=>{
                                        dialog1.close();
                                    }, 3000)
                                }, 5000)
                            }))
                        }, 3000 );
                    });

                const dialog = new AISDialogViewController();
                dialog
                    .setTitle('I\'m a dynamic dialog view')
                    .setDraggable(true)
                    .setContent('Dynamic dialog content')
                    .setAction( closeAction )
                    .setAction( updateAction )
                    // Or 
                    // .setActions([ closeAction, updateAction ])
                    .setMaxWidth('md')
                    .show( ( modal, component ) => {
                    });


        }

        return (
            <div className="App">
                <Button variant={'contained'} onClick={handleClick}>
                    Open dynamic dialog
                </Button>
            </div>
        );
    }
    
    export default App;
```

