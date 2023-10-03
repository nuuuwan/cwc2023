import { Component } from 'react';
import {STYLE} from './HomePageStyle';
import {Box} from '@mui/material';

export default class HomePage extends Component {
    renderHeader() {
        return 'Header';
    }
    renderBody() {
        return 'Body';
    }
    renderFooter() {
        return 'Footer';
    }
    render() {
        return (
            <Box sx={STYLE.ALL}>
              <Box sx={STYLE.HEADER}>{this.renderHeader()}</Box>
              <Box sx={STYLE.BODY}>{this.renderBody()}</Box>
              <Box sx={STYLE.FOOTER}>{this.renderFooter()}</Box>
            </Box>
        );
    }
}