// @flow
import React  , { Component } from 'react';
import { TouchableWithoutFeedback , Platform , Image , View , Text } from 'react-native';


type Props = {
  isSelected : boolean,
  radio_tag : number,
  onPress : any,
  
  text : string,
  justifyContent? : ?string,
  height? : number,
  space? : number,
  radius? : number,
  type? : ?string,

  selectColor? : ?string,
  unselectColor? : ?string,

  selectImage? : ?string,
  unselectImage? : ?string,

  viewSelected? : ?any,
  viewUnselected? : ?any,

  textColor? : ?string,
  textFontSize? : number,
  textFontFamily? : string,
}

type State = {
  isSelected : boolean,
}

export class CheckBox extends Component<Props , State> {

  static defaultProps = {
    isSelected : false,
    radio_tag : undefined,
    onPress : undefined,
    text : '',
    justifyContent : 'flex-start',

    height : 30,
    space : 2,
    radius : 15,
    selectColor : 'green',
    unselectColor : 'green',
  
    textColor : 'black',
    textFontSize : 16,
    textFontFamily : 'System',
  
    selectImage : undefined,
    unselectImage : undefined,

    viewSelected : undefined,
    viewUnselected : undefined,

    type : 'color'
  }

  constructor(props : any){
    super(props);
    this.state = {
      isSelected : this.props.isSelected
    };
  }


  componentWillReceiveProps(nextProps : any) {
    if (nextProps.isSelected !== this.state.isSelected ){
      this.setState({ isSelected : nextProps.isSelected })
    }
  }


  buttonSelected = () => {

    if (this.props.onPress !== undefined) {
      if (this.props.radio_tag !== undefined) {
        this.props.onPress(this.props.radio_tag)
      }
      else{

        // To handle case where CheckBox is used directly
        this.setState({
          isSelected : !this.state.isSelected
        }, () => {
          this.props.onPress(this.state.isSelected)
        })
      }
    }
  }


  render(){

    return(
      <TouchableWithoutFeedback
        onPress = { () => {this.buttonSelected()} }
        >
        <View style = {{ height : (this.props.height + 6) , width : '100%' , flexDirection : 'row' , alignItems : 'center' , justifyContent : this.props.justifyContent}}>
          { this.renderBoxView() }
          { this.renderTextView() }
        </View>
      </TouchableWithoutFeedback>
    );
  }


  renderBoxView(){

    const { height , space , selectColor , radius , 
      unselectColor , type , viewSelected, viewUnselected , 
      selectImage , unselectImage
    } = this.props

    const {isSelected} = this.state

    const r_color = isSelected ? selectColor : unselectColor;

    let inner_radius = radius;

    if (space === 0) {
      inner_radius = 0;
    }

    if (height !== undefined && radius === height/2) {
      inner_radius = (height - space)/2;
    }

    if (type === 'custom') {
      return isSelected ? viewSelected : viewUnselected;
    }
    else if (type === 'image') {
      <View style = {{ width : height , height : height , borderRadius : radius , padding : space , borderWidth : 1 , borderColor : r_color }}>
        <Image style = {{ flex : 1 , borderRadius : inner_radius }} source = {isSelected ? selectImage : unselectImage}/>
      </View>
    }
    else if (type === 'color'){
      return(
        <View style = {{ width : height , height : height , borderRadius : radius , padding : space , borderWidth : 1 , borderColor : r_color }}>
          <View style = {{ flex : 1 , borderRadius : inner_radius, backgroundColor : isSelected ? r_color : 'transparent'}}/>
        </View>
      )
    }
  }


  renderTextView(){
    const { textColor , textFontSize , textFontFamily , text } = this.props

    return(
      <Text style = {{ marginLeft : 5 , color : textColor , fontSize : textFontSize , fontFamily : textFontFamily }}>{text}</Text>
    )
  }

}
