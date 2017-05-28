/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 Dan "Ducky" Little
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

/* All of the JSTS integration is integrated into this module.
 *
 * This was done with the intent of developing a system that makes
 * JSTS optional into the future.  And/or makes it so that different
 * geometry libraries can be substituted in the future.
 *
 */

import BufferOp from 'jsts/org/locationtech/jts/operation/buffer/BufferOp';
import GeoJSONParser from 'jsts/org/locationtech/jts/io/GeoJSONParser';

export function buffer(feature, meters) {
    const parser = new GeoJSONParser();
    const jsts_geom = parser.read(feature);

    const buffer_feature = BufferOp.bufferOp(jsts_geom, meters);

    return parser.write(buffer_feature);
}
