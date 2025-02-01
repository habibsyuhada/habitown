import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';

interface IconComponentProps {
  name: string;
  size: number;
  color: string;
}

const IconComponent = ({ name, size, color }: IconComponentProps) => {
  if (Platform.OS === 'web') {
    const glyph = MaterialCommunityIcons[name];

    if (!glyph) {
      console.warn(`Icon "${name}" not found in MaterialCommunityIcons`);
      return null;
    }

    return (
      <span
        className="material-community-icons"
        style={{
          fontSize: size,
          color: color,
          display: 'inline-block',
        }}
        aria-hidden="true">
        {String.fromCodePoint(glyph)}
      </span>
    );
  }

  return <Icon name={name} size={size} color={color} />;
};

export default IconComponent;
