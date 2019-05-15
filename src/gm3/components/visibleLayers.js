/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2016-2017 Dan "Ducky" Little
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react';
import { Provider, connect } from 'react-redux';

import CatalogLayer from './catalog/layer';
import { getLayersByZOrder } from '../util';

/* VisibleLayers Tab.
 *
 * Displays layers in their map layer order.
 *
 */
class VisibleLayers extends React.Component {
    render() {
        // get the list of layers order'd by the stack order
        const layers = getLayersByZOrder(this.props.catalog, this.props.mapSources);
        const n_layers = layers.length;

        let contents;

        if(n_layers > 0) {
            const catalog_layers = [];
            for(let i = 0, ii = layers.length; i < ii; i++) {
                const layer = layers[i];
                catalog_layers.push(
                    <CatalogLayer
                        key={'layer-' + i}
                        layer={layer.layer}
                        forceTools={['up', 'down']}
                    />
                );
            }
            contents = catalog_layers;
        } else {
            contents = (<i>No layers are visible</i>);
        }

        return (
            <Provider store={this.props.store}>
                <div className="catalog visible-layers flat">
                    <div className="info-box">
                    This tab lists all of the visible layers. Checking a layer
                    from the Catalog will cause the layer to appear here. Unchecking a
                    layer's checkbox will cause it to disappear from this list.
                    </div>
                    { contents }
                </div>
            </Provider>
        );
    }
}


const mapFavoritesToProps = function(store) {
    return {
        mapSources: store.mapSources,
        catalog: store.catalog
    }
}

export default connect(mapFavoritesToProps)(VisibleLayers);
