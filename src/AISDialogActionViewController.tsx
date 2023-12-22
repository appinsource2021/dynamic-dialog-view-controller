import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {_dialogComponent} from "./AISDialogViewController";
import { Component, RefObject } from "react";

type ButtonVariantType = "contained" | "outlined" | "text"
type ActionColorTypes = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
type ActionCallbackArgs = (
    button?: DialogBaseAction,
    dialog?: _dialogComponent
) => void;

type StateListenerCallback = (
    button?: DialogBaseAction | AISDialogActionViewController,
    dialog?: _dialogComponent
) => void;

interface Props {
    onLoad?: Function;
    title: any;
    onClick: Function;
    color?: ActionColorTypes;
    variant?: ButtonVariantType,
    disabled?: boolean,
    dialog: _dialogComponent;
}

interface State {}

class DialogBaseAction extends Component<Props, State>{
    _buttonWrapperRef: RefObject<HTMLButtonElement>;
    _disabled: boolean;
    _inProcess: boolean;
    _label: any ;
    _color: ActionColorTypes;
    _variant: ButtonVariantType;
    _action: any;
    _dialog: _dialogComponent;

    constructor( props ) {
        super(props);
        this.state = {};
        this._label = this.props.title;
        this._disabled = this.props.disabled;
        this._color = this.props.color;
        this._variant = this.props.variant;
        this._action = this.props.onClick;
        this._dialog = this.props.dialog;

        this._buttonWrapperRef = React.createRef();
        this.setDisabled = this.setDisabled.bind(this);
        this.setColor = this.setColor.bind(this);
        this.setLabel= this.setLabel.bind(this);
        this.setInProcess = this.setInProcess.bind(this);
    }
    componentDidMount() {
        if ( undefined !== this.props.onLoad && typeof this.props.onLoad === "function" ) {
            this.props.onLoad(this);
        }
    }
    setAction( action: ActionCallbackArgs): this {
        try{
            this._buttonWrapperRef.current.onclick = event => { action( this, this._dialog ); }
            this.forceUpdate();
        } catch (e) {
            console.warn('ais dialog action', e.message );
        }
        return this;
    }
    setVariant( variant: ButtonVariantType ): this {
        this._variant = variant;
        this.forceUpdate();
        return this;
    }
    setLabel(label: any ): this {
        this._label = label;
        this.forceUpdate();
        return this;
    }
    setColor(color: ActionColorTypes): this {
        this._color = color;
        this.forceUpdate();
        return this;
    }
    setDisabled(disabled: boolean): this {
        this._disabled = disabled;
        this.forceUpdate();
        return this;
    }
    setInProcess(value = false): this {
        this._inProcess = value;
        this.forceUpdate();
        return this;
    }
    remove(): void {
        try{
            this._buttonWrapperRef.current.remove();
        } catch (e) { console.warn('Dialog action', e.message)}
    }
    render() {

        return (
            <LoadingButton
                ref={this._buttonWrapperRef}
                sx={{
                    "& .button-content": {
                        display: "flex",
                        gap: ".2rem",
                        justifyContent: "space-between",
                        alignItems: "center",
                        "& *": {
                            display: "flex"
                        }
                    }
                }}
                size="small"
                onClick={(event) => {
                    if ( this._action !== undefined && typeof this._action === "function" ) {
                        this._action ( this, event );
                    }
                }}
                color={ this._color }
                loading={ this._inProcess }
                variant={ this._variant }
                disabled={ this._disabled }
            >
                {/*<div className="button-content"> { Array.isArray(this._label) ? this._label*/}
                {/*    .map((item, index) => <div key={index}>{item}</div>)*/}
                {/*    .join(" ") : this._label } </div>*/}
                <div>
                    { this._label }
                </div>
            </LoadingButton>
        );
    }
}

class AISDialogActionViewController{

    label: any;
    action: ActionCallbackArgs;
    color: ActionColorTypes;
    component: DialogBaseAction;
    variant: ButtonVariantType;
    disabled: boolean|undefined;
    _stateListener: StateListenerCallback;

    constructor() {
        this.label = null;
        this.color = 'primary';
        this.variant = 'text';
    }
    setLabel( label: any ): this {
        this.label = label;
        try {
            this.component.setLabel( label );
        } catch (e) {}
        return this;
    }
    getLabel(): any { return this.label; }
    setVariant( variant: ButtonVariantType ): this {
        this.variant = variant;
        try{
            this.component.setVariant( variant );
        } catch (e) {}
        return this;
    }
    getVariant(): ButtonVariantType { return this.variant; }
    setColor(color: ActionColorTypes): this {
        this.color = color;
        try{
            this.component.setColor( color );
        } catch (e) {}
        return this;
    }
    getColor(): ActionColorTypes{ return this.color; }
    setAction( action: ActionCallbackArgs): this {
        this.action = action;
        try{
            this.component.setAction( action );
        } catch (e) {}
        return this;
    }
    getAction(): ActionCallbackArgs{ return this.action; }
    setDisabled(disabled: boolean): this {
        this.disabled = disabled;
        try{
            this.component.setDisabled( disabled );
        } catch (e) {}
        return this;
    }
    getDisabled(): boolean{return this.disabled;}
    setInProcess( value: boolean): this{
        try{
            this.component.setInProcess( value );
        } catch (e) {}
        return this
    }
    remove(): void { this.component.remove(); }
    setComponent( component: DialogBaseAction): this {
        this.component = component;
        return this;
    }
    stateListener( listener: StateListenerCallback ): this{
        this._stateListener = listener;
        return this;
    }
}

export { AISDialogActionViewController as dialogActionView }
export { AISDialogActionViewController }
export { DialogBaseAction };
