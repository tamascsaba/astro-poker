<script>
	let count = 0;

	function handleClick() {
		count += 1;
	}
</script>

<span on:click={handleClick}>🧑‍🚀 {count === 0 ? ' ' : count}</span>