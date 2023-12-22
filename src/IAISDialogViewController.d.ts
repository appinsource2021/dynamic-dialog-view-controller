import AISDialogViewController, {_dialogComponent} from "./AISDialogViewController";
import {dialogActionView} from "./AISDialogActionViewController";
// type DialogShowCallbackArgs = (dialog: AISDialogViewController, component: _dialogComponent ) => void;
// type DialogMaxSizeType = "xs" | "sm" | "md" | "lg" | "xl";
import { SxProps } from '@mui/system';
import {Theme} from "@mui/material";

type TypeStateListener           = <T>( state: State, dialog: _dialogComponent) => void;
type DialogShowCallbackArgs     = ( dialog: _dialogComponent ) => void;
type DialogCloseCallbackArgs    = ( dialog: _dialogComponent ) => void;
type DialogContentCallbackArgs  = ( dialog: _dialogComponent ) => any;
type DialogMaxSizeType          = "xs" | "sm" | "md" | "lg" | "xl";
type TypeComponentPosition = {getZIndex: <T>() => number };
interface State {}  // New Prop


export declare interface IAISDialogViewController {
    setActions( actions: Array<dialogActionView> ): this;
    setAction( action: dialogActionView ): this;
    setHeader( content: DialogShowCallbackArgs ): this;
    setTitle( content: DialogShowCallbackArgs ): this;
    setContent( content: DialogShowCallbackArgs, props?: SxProps<Theme> ): this;
    setDraggable( draggable: boolean ): this;
    setCloseable( closeable: boolean): this;
    setMaxWidth( width: DialogMaxSizeType ): this;
    show( callbackFn?: DialogShowCallbackArgs): void;
    // stateListener( callbackFn: <T>( state: State) => void ): this;  // New Prop
    stateListener( callbackFn:  TypeStateListener ): AISDialogViewController
    /**
     * Bring the dialog in front of the specified component.
     * */
    bringToFront(component: TypeComponentPosition): AISDialogViewController;
    /**
     * Sends the dialog behind the specified component
     * */
    sendToBack( component: TypeComponentPosition ): AISDialogViewController;
}