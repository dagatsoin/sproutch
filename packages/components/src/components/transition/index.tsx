/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from 'react';
import { InterpolatorConfig, useTransition, useSpringRef, Interpolation, to, UseTransitionProps } from '@react-spring/core';
import { Platform, ViewStyle } from 'react-native';
import { AnimatableProps, AnimatedValues, TranformAnimatableProps, TransformKeys, ViewStyleAnimatableKeys } from './type';
import { AnimatedView } from '../animated';
import { SpringValue } from '@react-spring/web';

export const DEFAULT_INTERPOLATOR_CONFIG: InterpolatorConfig = {
  range: [0, 360],
  output: ['0deg', '360deg'],
}

export const TRANSFORM_KEYS = ['translateX', 'translateY', 'rotateX', 'rotateY', 'rotateZ', 'rotate', 'skewX', 'skewY', 'perspective', 'scale', 'scaleX', 'scaleY', 'matrix'] satisfies TransformKeys[]

function isTransformKey(key: keyof AnimatedValues): key is TransformKeys {
  return TRANSFORM_KEYS.includes(key as TransformKeys)
}

function splitStyle(props: Partial<Record<keyof AnimatedValues, SpringValue<any>>>): {
  transformKeys: TransformKeys[]
  style: Partial<Record<ViewStyleAnimatableKeys, SpringValue<unknown>>>
} {
  const transformKeys: TransformKeys[] = []
  const style: Partial<Record<ViewStyleAnimatableKeys, SpringValue<unknown>>> = {}

  const keys = Object.keys(props) as unknown as( keyof AnimatedValues)[]
  
  keys.forEach(function(key) {
    const value = props[key]
    if (value) {
      if(isTransformKey(key)) {
        transformKeys.push(key)
      } else {
        style[key] = value
      }
    }
  })

  return {
    transformKeys,
    style,
  }
}

export function Transition<T>({
  id, wrapperStyle, configuration, renderFn,
}: {
  id: T;
  wrapperStyle?: ViewStyle;
  configuration: Omit<UseTransitionProps<T>, 'ref'> & {
    interpolatorConfig?: {
      rotation?: InterpolatorConfig;
      skew?: InterpolatorConfig;
    };
    from?: AnimatableProps;
    initial?: AnimatableProps;
    enter?: AnimatableProps;
    leave?: AnimatableProps;
  };
  renderFn: (id: T) => React.ReactElement;
}) {
  const transRef = useSpringRef();

  const config = {
    ref: transRef,
    ...configuration,
  };

  const transitions = useTransition<T, Record<keyof AnimatedValues, number | undefined>>(id, config);
  useEffect(function () {
    transRef.start();
  }, [id]);

  type Style = Partial<Record<keyof TranformAnimatableProps, Interpolation<number, string>>>[];

  return transitions((props, item, _state, key) => {
    const {style, transformKeys} = splitStyle(props)
    const transforms: Array<[keyof TranformAnimatableProps, Interpolation<number, string | number | readonly (string | number)[]> | SpringValue]> = []
    
    for (const key of transformKeys) {
      if (props[key]) {
        switch(key) {
          case "translateX":
          case "translateY":
            transforms.push([key, Platform.OS === "web"
              ? props[key].to(t => `${t}px`)
              : props[key]
            ])
            break;
          case "rotate":
          case "rotateX":
          case "rotateY":
          case "rotateZ":
            transforms.push([key, props[key]
              .to(
                (configuration.interpolatorConfig?.rotation ?? DEFAULT_INTERPOLATOR_CONFIG).range!,
                (configuration.interpolatorConfig?.rotation ?? DEFAULT_INTERPOLATOR_CONFIG).output
              )
            ])
            break;
          case "scale":
          case "scaleX":
          case "scaleY":
          case "perspective":
            transforms.push([key, props[key]])
            break;
          case "skewX":
          case "skewY":
            transforms.push([key, props[key]
              .to(
                (configuration.interpolatorConfig?.skew ?? DEFAULT_INTERPOLATOR_CONFIG).range!,
                (configuration.interpolatorConfig?.skew ?? DEFAULT_INTERPOLATOR_CONFIG).output
              )
            ])
          break;
          case "matrix":
            console.warn("[Sproutch] matrix is not currently supported in animated transition")
            transforms.push([key, props[key]])
            break;
        }
      }
    }

    return (
      <AnimatedView
        key={key}
        style={{
          ...wrapperStyle as any,
          ...style as any,
          transform: (Platform.OS === "web")
            ? to(
              transforms.map(([_, value]) => value),
              (...args) => args.reduce<string>((str, value, i) =>`${str} ${transforms[i][0]}(${value})`, '')
            )
            : transforms.reduce<Style>((input, [key, value]) => {
              input.push({[key]: value})
              return input
            }, [])
        }}>
        {renderFn(item)}
      </AnimatedView>
    );
  });
}
