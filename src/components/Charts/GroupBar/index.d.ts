import * as React from 'react';
import View from '@antv/data-set';
export interface IGroupBarProps {
  title: React.ReactNode;
  color?: string;
  padding?: [number, number, number, number];
  height: number;
  data: View;
  autoLabel?: boolean;
  style?: React.CSSProperties;
}

export default class GroupBar extends React.Component<IGroupBarProps, any> {}
