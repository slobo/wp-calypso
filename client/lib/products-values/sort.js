/**
 * External dependencies
 */
import difference from 'lodash/array/difference';
import flatten from 'lodash/array/flatten';
import groupBy from 'lodash/collection/groupBy';
import pairs from 'lodash/object/pairs';
import sortBy from 'lodash/collection/sortBy';

/**
 * Internal dependencies
 */
import { isIncludedWithPlan } from 'lib/purchases';
import {
	getDomainProductRanking,
	isCredits,
	isDomainProduct,
	isPlan
} from 'lib/products-values';

/**
 * Sorts all products in the following order:
 *
 * 1. Plan
 * 2. Domain Cart Items. Included in plans come first.
 *   a. Domain Registration
 *   b. Domain Mapping
 *   c. Privacy Protection
 * 3. Other Cart Items
 * 4. Credits Cart Item
 *
 * @param {Object[]} products
 *
 * @returns {Object[]} the sorted list of items in the shopping cart
 */

function sortProducts( products ) {
	var planItems,
		includedItems,
		domainItems,
		creditItems,
		otherItems;

	planItems = products.filter( isPlan );

	includedItems = products.filter( isIncludedWithPlan );

	domainItems = difference( products, includedItems )
	domainItems = domainItems.filter( isDomainProduct );
	domainItems = pairs( groupBy( domainItems, 'meta' ) );
	domainItems = sortBy( domainItems, function( pair ) {
		if ( pair[ 1 ][ 0 ] && pair[ 1 ][ 0 ].cost === 0 ) {
			return -1;
		}
		return pair[ 0 ];
	} );
	domainItems = domainItems.map( function( pair ) {
		return sortBy( pair[ 1 ], getDomainProductRanking );
	} );
	domainItems = flatten( domainItems );

	creditItems = products.filter( isCredits );

	otherItems = difference( products, planItems, domainItems, includedItems, creditItems );

	return planItems
		.concat( includedItems )
		.concat( domainItems )
		.concat( otherItems )
		.concat( creditItems );
}

export default sortProducts;
