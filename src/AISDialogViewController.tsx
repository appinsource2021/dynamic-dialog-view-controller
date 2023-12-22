import * as React from 'react';
import {Component, Ref, RefObject, useEffect, useImperativeHandle} from 'react';
import { createRoot } from 'react-dom/client';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { dialogActionView, DialogBaseAction} from './AISDialogActionViewController';
import Dialog, {DialogProps} from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import {IconButton, Snackbar, Theme} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {SxProps, width} from '@mui/system';

export type AnchorXType = "left" | "center" |"right"
export type AnchorYType = "top" | "bottom"
export type AnchorOriginType =  { X: AnchorXType  , Y: AnchorYType };

type TypeStateListener          = <T>( state: State, dialog: _dialogComponent) => void;
type DialogShowCallbackArgs     = (dialog: _dialogComponent ) => void;
type DialogCloseCallbackArgs    = ( dialog: _dialogComponent ) => void;
type DialogContentCallbackArgs  = ( dialog: _dialogComponent ) => any;
type DialogMaxSizeType          = "xs" | "sm" | "md" | "lg" | "xl";
type ComponentAxisType = { getAxis: <T>() => number };
type SnackbarSeverityType = "success" | "error" | "warning";
import {SnackbarProvider, useSnackbar } from 'notistack';



interface Props{
    content?: DialogContentCallbackArgs,
    title?: DialogContentCallbackArgs,
    actions: Array<dialogActionView>,
    closeable: boolean,
    maxWidth: DialogMaxSizeType,
    maxHeight: number,
    parent: AISDialogViewController,
    contentProps: SxProps<Theme>,
    didMountCallback: DialogShowCallbackArgs,
    draggable?: boolean,
    children?: DialogContentCallbackArgs,
    reference: AISDialogViewController,
    /**
     * Bring the dialog in front of the specified component.
     * */
    bringToFrontComponent: ComponentAxisType,
    /**
     * Sends the dialog behind the specified component
     * */
    sendToBackComponent: ComponentAxisType,
    /**
     * Sends the dialog behind the specified component
     * */
    alignPositionsWithComponent: ComponentAxisType,
    stateListener: <T>( state: State, dialog: _dialogComponent ) => void,
    snackbarConf?: AnchorOriginType
}
interface State {}

const PaperComponent = (props: any) => {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}  >
            <Paper {...props} sx={{overflowX: 'hidden'}}  />
        </Draggable>
    );
};


const WithSnackBar = ({ notistackRef, children, anchorOrigin }: {
    notistackRef: Ref<any>,
    children: any,
    anchorOrigin?: AnchorOriginType
}) => {

    const providerRef = React.useRef(null);
    const [anchor] = React.useState({X: anchorOrigin ? anchorOrigin.X : "left", Y: anchorOrigin ? anchorOrigin.Y : "bottom"});

    useImperativeHandle( notistackRef, () => ({
        snackbar: snackbar
    }));

    const snackbar = () => {
        return {
            open: ( message: string, severity: SnackbarSeverityType = "success", key:string = null ) => {
                return providerRef.current.enqueueSnackbar( message, {
                    variant:severity,
                    key: key,
                    anchorOrigin:{
                        vertical: anchor.Y,
                        horizontal: anchor.X
                    },
                    autoHideDuration: 3000
                    // maxSnack:10
                })
            },
            close:( key: string ) => {
                // enqueueSnackbar(key);
            }
        }
    };
    return <SnackbarProvider maxSnack={3} ref={providerRef}>{children}</SnackbarProvider>;
};

class _dialogComponent extends Component<Props, State> {
    getAxis(): number {
        return this._axis;
    }

    setAxis(value: number) {
        this._axis = value;
    }
    get formikProps(): object {
        return this._formikProps;
    }

    set formikProps(value: object) {
        this._formikProps = value;
    }

    _title: DialogContentCallbackArgs;
    _content: DialogContentCallbackArgs;
    _contentProps: SxProps<Theme>;
    _actions: Array<dialogActionView>;
    _closeable: boolean;
    _maxWidth: DialogMaxSizeType;
    _parent: AISDialogViewController;
    _draggable: boolean;
    _children: any;
    _reference: AISDialogViewController;
    _open: boolean;
    _closeCallbackFn: DialogCloseCallbackArgs;
    _stateListener: <T>( state: State, dialog: _dialogComponent ) => void ;  // New Prop
    _axis: number;
    _formikProps: object;
    _dialogRef: React.RefObject<HTMLDivElement>;
    _notistackRef: React.RefObject<HTMLDivElement>;
    _snackbarConf: AnchorOriginType;

    constructor( props: Props ){
        super( props );
        this.state = {};
        this._open = true;
        this._title = props.title;
        this._content = props.content ? props.content : props.children; // (props.children ? props.children : '');
        this._contentProps = props.contentProps;
        this._closeable = props.closeable;
        this._maxWidth = props.maxWidth;
        this._parent = props.parent;
        this._draggable = props.draggable;
        this._reference = props.reference;
        this._stateListener = props.stateListener; // New Prop
        this.setAxis(1299);// ⬅️ Initial Axis
        this._dialogRef = React.createRef();
        this._notistackRef = React.createRef();

        this._snackbarConf = props.snackbarConf;
    }

    get snackbar(){
        return this._notistackRef.current['snackbar']();
    };

    // New Prop
    setState(state: ((prevState: Readonly<State>, props: Readonly<Props>) => State | null) | State | null, callback?: () => void) {
        if( undefined !== this._stateListener && typeof this._stateListener ===  "function" ){
            super.setState(state, ()=>{
                if( undefined !== callback && typeof callback === "function" ){
                    callback();
                }
                this._stateListener( state, this );
            });
        }
        super.setState(state, callback);
    }
    componentDidMount(): void {
        if( this.props.parent !== null ){
            this.props.parent._component = this;
        }
        if( this.props.didMountCallback !== undefined && typeof this.props.didMountCallback === "function" ){
            this.props.didMountCallback( this );
        }
        if( this.props.bringToFrontComponent ) {
            this.bringToFront( this.props.bringToFrontComponent );
        }
        if( this.props.sendToBackComponent ) {
            this.sendToBack(this.props.sendToBackComponent);
        }
        if( this.props.alignPositionsWithComponent ) {
            this.alignPositionsWith(this.props.alignPositionsWithComponent);
        }
    }
    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if(this.state !== prevState){
            this.props.actions.map( action => {
                if( action._stateListener !== undefined && typeof action._stateListener === "function" ){
                    action._stateListener( action, this );
                }
            })
        }
    }
    setAction( action: dialogActionView ): this {
        this._actions.push( action );
        this.forceUpdate();
        return this;
    }
    setTitle( content: DialogContentCallbackArgs ): this {
        this._title = content;
        this.forceUpdate();
        return this;
    }
    setContent( content: DialogContentCallbackArgs, props?: SxProps<Theme> ): this {
        this._content = content;
        this._contentProps = props;
        this.forceUpdate();
        return this;
    }
    setDraggable( draggable: boolean ): this {
        this._draggable = draggable;
        this.forceUpdate();
        return this;
    }
    setCloseable( closeable: boolean): this {
        this._closeable = closeable;
        this.forceUpdate();
        return this;
    }
    setMaxWidth( width: DialogMaxSizeType ): this {
        this._maxWidth = width;
        this.forceUpdate();
        return this;
    }
    close( callbackFn?: DialogCloseCallbackArgs ){
        this._open = false;
        this._closeCallbackFn = callbackFn;
        this.forceUpdate();
    }

    /**
     * Bring the dialog in front of the specified component.
     * */
    bringToFront(component: ComponentAxisType ): _dialogComponent {
        // Implementation of bringToFront function
        // You can use component.getZIndex() here to get the z-index value
        // and create a dialog component accordingly.
        try{
            this.setAxis(component.getAxis() + 1);
            this.forceUpdate();
        } catch (e){
            console.error(e.message);
        }

        return this;
    }

    /**
     * Sends the dialog behind the specified component
     * */
    sendToBack( component: ComponentAxisType ): _dialogComponent {
        // Implementation of bringToFront function
        // You can use component.getZIndex() here to get the z-index value
        // and create a dialog component accordingly.
        try{
            this.setAxis( component.getAxis() - 1);
            this.forceUpdate();
        } catch (e){
            console.error(e.message);
        }

        return this;
    }

    /**
     * Sends the dialog behind the specified component
     * */
    alignPositionsWith( component: ComponentAxisType ): _dialogComponent {
        // Implementation of bringToFront function
        // You can use component.getZIndex() here to get the z-index value
        // and create a dialog component accordingly.
        try{
            this.setAxis( component.getAxis());
            this.forceUpdate();
        } catch (e){
            console.error(e.message);
        }

        return this;
    }

    render() {

        return <Dialog
            ref={ this._dialogRef }
            sx={{zIndex: this.getAxis() }}
            PaperComponent={ this._draggable ? PaperComponent : null}
            aria-labelledby="draggable-dialog-title"
            open={ this._open }
            onClose={ event => {
                if( this._closeCallbackFn ){
                    this._closeCallbackFn( this );
                }
            }}
            maxWidth={this._maxWidth}
            fullWidth={true}
        >
            { this._title ?
                <DialogTitle component={'div'}  id="draggable-dialog-title" style={{ cursor: this._draggable ? "move" : "default" }} >
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: 2}}>
                        {this._title( this )}
                        {this._closeable &&
                            <IconButton aria-label="close" onClick={ event => { this.close() }}>
                                <CloseIcon/>
                            </IconButton>
                        }
                    </div>
                </DialogTitle>
                :
                <React.Fragment />
            }
            <DialogContent sx={{ ...this._contentProps}} >
                <WithSnackBar notistackRef={this._notistackRef} anchorOrigin={ this._snackbarConf }  >
                    {this.props.didMountCallback( this )}
                    { this._content( this )}
                </WithSnackBar>
            </DialogContent>
            <DialogActions>
                {
                    this.props.actions.map( ( action, index ) => {
                        return <DialogBaseAction
                            onLoad={ button => { action.setComponent( button ); }}
                            key={ index.toString() }
                            color={ action.getColor() }
                            title={ action.getLabel() }
                            variant={ action.getVariant() }
                            onClick={ ( button, event ) => {
                                action.getAction()( button, this )
                            }}
                            dialog={ this }
                            disabled={ action.getDisabled() }
                        />
                    })
                }
            </DialogActions>
        </Dialog>
    }
}

class AISDialogViewController{

    _title: DialogContentCallbackArgs;
    _content: any;
    _actions: Array<dialogActionView>;
    _closeable: boolean;
    _maxWidth: DialogMaxSizeType;
    _maxHeight: number;
    _contentProps: SxProps<Theme>;
    _component: _dialogComponent;
    _body: object;
    _draggable: boolean;
    _reference: AISDialogViewController;
    _stateListener: <T>( state: State, dialog: _dialogComponent ) => void;
    _bringToFrontComponent: ComponentAxisType;
    _sendToBackComponent: ComponentAxisType;
    _alignPositionsWithComponent: ComponentAxisType;
    _snackbarConf: AnchorOriginType;

    constructor() {
        this._title = null;
        this._closeable = false;
        this._content = 'Content';
        this._actions = [];
        this._maxWidth = 'sm';
        this._component = null;
    }
    setTitle( content: DialogContentCallbackArgs ): this { this._title = content; return this; }
    setHeader( content: DialogContentCallbackArgs): this { return this.setTitle(content); }
    setContent( content: DialogContentCallbackArgs, props?: SxProps<Theme> ): this {
        this._content = content;
        this._contentProps = props;
        return this;
    }
    setActions( actions: Array<dialogActionView> ): this { this._actions = actions; return this; }
    setAction( action: dialogActionView ): this { this._actions.push( action ); return this; }
    setDraggable( draggable: boolean ): this {
        this._draggable = draggable;
        return this;
    }
    setCloseable( closeable: boolean): this { this._closeable = closeable; return this; }
    setMaxWidth( width: DialogMaxSizeType ): this { this._maxWidth = width; return this; }
    stateListener( callbackFn: TypeStateListener ): AISDialogViewController {
        this._stateListener = callbackFn;
        return this;
    }

    setSnackbarConf( snackbarConf: AnchorOriginType ): this {
        this._snackbarConf = snackbarConf;
        return this;
    }

    /**
     * Bring the dialog in front of the specified component.
     * */
    bringToFront( component: ComponentAxisType ): AISDialogViewController {
        this._bringToFrontComponent = component;
        return this;
    }

    /**
     * Sends the dialog behind the specified component
     * */
    sendToBack( component: ComponentAxisType ): AISDialogViewController {
        this._sendToBackComponent = component;
        return this;
    }

    /**
     * Sends the dialog behind the specified component
     * */
    alignPositionsWith( component: ComponentAxisType ): AISDialogViewController {
        this._alignPositionsWithComponent = component;
        return this;
    }

    show( callbackFn?: DialogShowCallbackArgs){

        const dom = document.createElement('div');
        document.body.appendChild( dom );

        const props = {
            actions: this._actions,
            open: true,
            title: this._title,
            ref: React.createRef(),
            closeable: this._closeable,
            maxWidth: this._maxWidth,
            maxHeight: this._maxHeight,
            parent: this,
            contentProps: this._contentProps,
            didMountCallback: callbackFn,
            draggable: this._draggable,
            reference: this._reference,
            stateListener: this._stateListener,
            bringToFrontComponent: this._bringToFrontComponent,
            sendToBackComponent: this._sendToBackComponent,
            alignPositionsWithComponent: this._alignPositionsWithComponent,
            snackbarConf: this._snackbarConf
        };

        dom.remove();
        const root = createRoot(dom);
        root.render(  React.createElement( _dialogComponent, props, this._content ) );
    }
}
export default AISDialogViewController;
// export { _dialogComponent }