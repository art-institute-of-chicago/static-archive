//<!-- common java<script page for Escape from Thorne Mansion by Troy Klyber -->
//
//<!-- process variables import this <script from .js file-->
//<!-- ?room from, objects found, other state variables-->

var query = window.location.search;
query = query.substring(1);
var data = query.split(',');
for (i = 0; (i < data.length); i++) {
	data[i] = unescape(data[i]);
	}
var origin = data[0]
if (origin=='')
{origin = 'index';}
