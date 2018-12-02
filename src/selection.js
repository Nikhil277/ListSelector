// @flow
import React  , { Component } from 'react';
import { TouchableWithoutFeedback , Platform , Image , View , Text , StyleSheet} from 'react-native';
import { CheckBox } from './checkBox';


type Props = {
  data : Array<string>,
  selectedIndices? : ?Array<number>,
  selectedIndex? : ?number,

  placeHolder : string,
  selectionType? : string,
  selected? : any,
  spaceStyle? : any,
  direction? : string,

  checkBoxStyle? : {  
    justifyContent? : string,
    height? : number,
    space? : number,
    radius? : number,
    type? : string,
  
    selectColor? : string,
    unselectColor? : string,
  
    selectImage? : string,
    unselectImage? : string,
  
    viewSelected? : any,
    viewUnselected? : any,
  },

  checkBoxTextStyle? : {  
    textColor? : string,
    textFontSize? : number,
    textFontFamily? : string
  },

  placeHolderColor? : string,
  placeHolderFontFamily? : string,
  placeHolderFontSize? : number
}

type State = {
  selectionArray : Array<string>,
  selectedIndices : Array<number> | null,
  selectedIndex : ?number
}

export class ListSelection extends Component<Props , State> {

  static defaultProps = {
    data : [],
    selectedIndices : undefined,
    direction : 'column',
    spaceStyle : undefined,

    placeHolder : '',
    selectionType : 'Single',
    selected : undefined,

    checkBoxTextStyle : {},
    checkBoxStyle : {},

    placeHolderColor : 'black',
    placeHolderFontFamily : 'System',
    placeHolderFontSize : 16
  }

  constructor(props : any){
    super(props);
    this.state = {
      selectionArray : this.props.data ? this.props.data : [],
      selectedIndices : this.props.selectedIndices ? this.props.selectedIndices : null,
      selectedIndex : this.props.selectedIndex ? this.props.selectedIndex : undefined
    };
  }


  radioButtonSelected = (tag : number) =>{

    if (this.props.selectionType === 'single') {
      this.setState({ selectedIndex : tag }, () => {
        this.returnValues()
      });
    }
    else if (this.props.selectionType === 'multi') {
      let multiSelectArray = [];
      const selectedValues = this.state.selectedIndices;

      if (Array.isArray(selectedValues)) {
        multiSelectArray = selectedValues;

        if (multiSelectArray.includes(tag)) {
          multiSelectArray.splice( multiSelectArray.indexOf(tag), 1 );
        }
        else{
          multiSelectArray.push(tag);
        }
      }
      else{ // implies no data available, so just insert
        multiSelectArray.push(tag);
      }
      this.setState({ selectedIndices : multiSelectArray } , () => {
        this.returnValues()
      });
    }



  }


  returnValues = () => {
    if (this.props.selected !== undefined){
      if (this.props.selectionType === 'multi') {
        let selectedData = []
        for (let i = 0; i < this.state.selectionArray.length; i++) {
          let selectedIndices = this.state.selectedIndices !== null ? this.state.selectedIndices : []
          if (selectedIndices !== undefined && selectedIndices.includes(i)){
            selectedData.push(this.state.selectionArray[i])
          }          
        }
        this.props.selected({
          selectedIndices : this.state.selectedIndices,
          selectedData : selectedData
        })
      }
      else{
        let index = this.state.selectedIndex ? this.state.selectedIndex : 0

        this.props.selected({
          selectedIndex : this.state.selectedIndex , 
          selectedData : this.state.selectionArray[index]
        })
      }
    }
  }



  // minSelection : 2

  render(){

    const direction = this.props.direction
    return(
      <View style = {{width : '100%' , flexDirection : 'column' }}>

        {this.renderPlaceholder()}
        <View style = {{ width : '100%' , flexDirection : direction  }}>
          {this.renderRadioButtons()}
        </View>

      </View>
    )
  }

  renderPlaceholder(){
    const { placeHolderColor , placeHolderFontFamily , placeHolderFontSize } = this.props
    if (this.props.placeHolder !== '') {
      return(
        <Text style = {{color : placeHolderColor , fontFamily : placeHolderFontFamily , fontSize : placeHolderFontSize}}>
          {this.props.placeHolder}
        </Text>
      )
    }
  }

  renderRadioButtons(){

    const { justifyContent, height, space, radius, type,
      selectColor, unselectColor, selectImage,
      unselectImage, viewSelected, viewUnselected 
    } = this.props.checkBoxStyle

    const { textColor , textFontFamily , textFontSize } = this.props.checkBoxTextStyle
    const { selectedIndices , selectedIndex } = this.state

    let radioButtons = [];
    for (let i = 0 ; i < this.state.selectionArray.length ; i++){

      let selection = false;
      if (selectedIndices !== undefined) {
        if (Array.isArray(selectedIndices)) {
          if (this.state.selectedIndices.includes(i)) {
              selection = true;
          }
        }
      }
      else if (selectedIndex !== undefined) {

        if (!isNaN(this.state.selectedIndex)) {
          if (this.state.selectedIndex === i) {
            selection = true;
          }
        }
      }
      
      if (i > 0) {
        const direction = this.props.direction
        let style = {};
        if (direction === 'row') {
          style = (this.props.spaceStyle !== undefined) ? this.props.spaceStyle : {width : 10}
        }
        else {
          style = (this.props.spaceStyle !== undefined) ? this.props.spaceStyle : {marginBottom : 5}
        }
        radioButtons.push(
          <View key = {'checkBoxView' + i} style = {style}/>
        )
      }
      radioButtons.push(
        <CheckBox
          key = {'CheckBox' + i}
          text = {this.state.selectionArray[i]}
          radio_tag = {i}
          isSelected = {selection}
          onPress = {(tag) => {this.radioButtonSelected(tag)}}

          justifyContent = {justifyContent}
          height = {height}
          space = {space}
          radius = {radius}
          selectColor = {selectColor}
          unselectColor = {unselectColor}

          textColor = {textColor}
          textFontSize = {textFontSize}
          textFontFamily = {textFontFamily}

          selectImage = {selectImage}
          unselectImage = {unselectImage}

          viewSelected = {viewSelected}
          viewUnselected = {viewUnselected}

          type = {type}
        />
      )
    }
    return radioButtons;
  }

}

