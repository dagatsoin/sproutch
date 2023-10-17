import { BorderImage, Button, CircleButton, StyleSheet} from '@sproutch/ui'
import * as React from 'react'
import { View } from 'react-native'
import { ScrollView, Text } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome5';

const style = {
  button: StyleSheet.create({ 
    root: {
      margin: 8
    }
  }),
  section: StyleSheet.create({
    root: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      overflow: 'visible'
    }
  })
}

export default {
  title: 'Button',
  component: () => (
    <ScrollView
      style={{flex: 1}}
    >
      <View>
        <Text>Variant: Contained</Text>
        <View style={style.section.root}>
          <Button
            style={style.button}
            variant="contained"
            label="PRIMARY"
          />
          <Button
            style={style.button}
            variant="contained"
            label="RAISED"
            elevation={4}
          />
          <Button
            style={style.button}
            variant="contained"
            palette="secondary"
            label="SECONDARY"
          />
          <Button
            style={style.button}
            variant="contained"
            iconSlot={iconStyle => (
              <FontAwesome style={iconStyle} name="search" />
            )}
            label="PUSH"
          />
          <Button
            style={style.button}
            isDense
            variant="contained"
            iconSlot={iconStyle => (
              <FontAwesome style={iconStyle} name="search" />
            )}
            label="DENSE"
          />
          <Button
            style={style.button}
            variant="contained"
            isDisabled
            label="DISABLED"
          />
        </View>
        <Text style={{ marginTop: 50 }}>
          Variant: Outlined
        </Text>
        <View style={style.section.root}>
          <Button
            style={style.button}
            variant="outlined"
            palette="primary"
            label="PRIMARY"
            />
          <Button
            style={style.button}
            variant="outlined"
            palette="secondary"
            label="SECONDARY"
          />
          <Button
            style={style.button}
            variant="outlined"
            palette="primary"
            iconSlot={iconStyle => (
              <FontAwesome style={iconStyle} name="search" />
            )}
            label="PUSH"
          />
          <Button
            style={style.button}
            variant="outlined"
            isDisabled
            label="DISABLED"
          />
        </View>
        <Text style={{ marginTop: 50 }}>
          Circle button
        </Text>
        <View style={style.section.root}>
          <CircleButton iconSlot={_style => <FontAwesome name='check' style={_style}/>} radius={20}/>
          <CircleButton iconSlot={_style => <FontAwesome name='check' style={_style}/>}/>
          <CircleButton iconSlot={_style => <FontAwesome name='check' style={_style}/>} isDisabled/>
          <CircleButton iconSlot={_style => <FontAwesome name='check' style={_style}/>} elevation={12} palette="primary"/>
          <CircleButton iconSlot={_style => <FontAwesome name='check' style={_style}/>} palette="secondary"/>
        </View>
        <Text style={{ marginTop: 50 }}>
          Variant: Text
        </Text>
        <View style={style.section.root}>
          <Button style={style.button} variant="text" label="PRIMARY" />
          <Button
            style={style.button}
            variant="text"
            palette="secondary"
            label="SECONDARY"
          />
          <Button
            style={style.button}
            variant="text"
            iconSlot={iconStyle => (
              <FontAwesome style={iconStyle} name="search" />
            )}
            label="PUSH"
          />
          <Button style={style.button} variant="text" isDisabled label="DISABLED" />
        </View>
        <Text style={{ marginTop: 50 }}>
          Custom background
        </Text>
        <View style={style.section.root}>
          <Button
            style={{
              root: {
                ...style.button.root,
                height: 64,
                width: 200,
                borderRadius: 32,
              },
              content: {
                borderRadius: 32,
              },
              label: {
                color: '#FFE082',
              },
              icon: {
                color: '#FFE082',
              },
            }}
            elevation={10}
            label="CONTACT"
            iconSlot={iconStyle => (
              <FontAwesome style={iconStyle} name="user" />
            )}
            backgroundSlot={() => (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              >
                <BorderImage
                  uri="https://i.ibb.co/Yhs3Ff5/btn-bg.png"
                  borderWidth={32}
                  sliceWidth={127}
                />
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  ),
  /* decorators: [
    (Story: Story) => (
      <FontProvider>
        
          <Story />
        
      </FontProvider>
    ),
  ], */
}

export const Basic = {};