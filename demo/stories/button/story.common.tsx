import { BorderImage, Button, CircleButton, Styles, Text, View } from '@sproutch/ui'
import * as React from 'react'
import { ScrollView } from 'reactxp'

// tslint:disable-next-line: no-var-requires
const FontAwesome = require('react-native-vector-icons/FontAwesome')

const style = { root: Styles.createViewStyle({ margin: 8 }) }

export default function() {
  return (
    <ScrollView
      style={Styles.createScrollViewStyle({
        flex: 1,
      })}
    >
      <View>
        <Text>Variant: Contained</Text>
        <View
          style={Styles.createViewStyle({
            overflow: 'visible',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          })}
        >
          <Button
            style={style}
            variant="contained"
            label="PRIMARY"
          />
          <Button
            style={style}
            variant="contained"
            label="RAISED"
            elevation={4}
          />
          <Button
            style={style}
            variant="contained"
            palette="secondary"
            label="SECONDARY"
          />
          <Button
            style={style}
            variant="contained"
            iconSlot={iconStyle => (
              <FontAwesome.default style={iconStyle} name="search" />
            )}
            label="PUSH"
          />
          <Button
            style={style}
            isDense
            variant="contained"
            iconSlot={iconStyle => (
              <FontAwesome.default style={iconStyle} name="search" />
            )}
            label="DENSE"
          />
          <Button
            style={style}
            variant="contained"
            isDisabled
            label="DISABLED"
          />
        </View>
        <Text style={Styles.createTextStyle({ marginTop: 50 })}>
          Variant: Outlined
        </Text>
        <View
          style={Styles.createViewStyle({
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          })}
        >
          <Button
            style={style}
            variant="outlined"
            palette="primary"
            label="PRIMARY"
            />
          <Button
            style={style}
            variant="outlined"
            palette="secondary"
            label="SECONDARY"
          />
          <Button
            style={style}
            variant="outlined"
            palette="primary"
            iconSlot={iconStyle => (
              <FontAwesome.default style={iconStyle} name="search" />
            )}
            label="PUSH"
          />
          <Button
            style={style}
            variant="outlined"
            isDisabled
            label="DISABLED"
          />
        </View>
        <Text style={Styles.createTextStyle({ marginTop: 50 })}>
          Circle button
        </Text>
        <View
          style={Styles.createViewStyle({
            flexDirection: 'row',
            overflow: 'visible',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          })}
        >
          <CircleButton iconSlot={_style => <FontAwesome.default name='check' style={_style}/>} radius={20}/>
          <CircleButton iconSlot={_style => <FontAwesome.default name='check' style={_style}/>}/>
          <CircleButton iconSlot={_style => <FontAwesome.default name='check' style={_style}/>} isDisabled/>
          <CircleButton iconSlot={_style => <FontAwesome.default name='check' style={_style}/>} elevation={12} palette="primary"/>
          <CircleButton iconSlot={_style => <FontAwesome.default name='check' style={_style}/>} palette="secondary"/>
        </View>
        <Text style={Styles.createTextStyle({ marginTop: 50 })}>
          Variant: Text
        </Text>
        <View
          style={Styles.createViewStyle({
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          })}
        >
          <Button style={style} variant="text" label="PRIMARY" />
          <Button
            style={style}
            variant="text"
            palette="secondary"
            label="SECONDARY"
          />
          <Button
            style={style}
            variant="text"
            iconSlot={iconStyle => (
              <FontAwesome.default style={iconStyle} name="search" />
            )}
            label="PUSH"
          />
          <Button style={style} variant="text" isDisabled label="DISABLED" />
        </View>
        <Text style={Styles.createTextStyle({ marginTop: 50 })}>
          Custom background
        </Text>
        <View
          style={Styles.createViewStyle({
            overflow: 'visible',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          })}
        >
          <Button
            style={{
              root: {
                height: 64,
                width: 200,
                ...(style.root as object),
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
              <FontAwesome.default style={iconStyle} name="user" />
            )}
            backgroundSlot={() => (
              <View
                style={Styles.createViewStyle({
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                })}
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
  )
}
