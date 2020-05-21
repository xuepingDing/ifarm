<template>
	<div>
		<invoiceorder></invoiceorder>
	</div>
</template>

<script>
import invoiceorder from '@/components/orderadmin/invoiceorder/index';
export default{
	name: "invoiceorderview",
	components:{
		invoiceorder,
	},
}
</script>